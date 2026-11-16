
import { useEffect, useState } from 'react';
import API from '../../services/api';
import EmptyState from '../../components/EmptyState';
import { Bell, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    API.get('/notifications')
      .then((r) => setItems(r.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const markAll = async () => {
    try {
      await API.put('/notifications/read-all');
      load();
      toast.success('All notifications marked as read');
    } catch (err) {
      toast.error('Failed to update notifications');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notifications/${id}`);
      setItems(items.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="max-w-3xl mx-auto text-white">

      <div className="flex justify-between items-center mb-8 gap-3">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-sm text-gray-400 mt-1">
            Stay updated with your latest activities.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={markAll}
            className="text-sm font-medium text-purple-400 hover:text-purple-300 transition"
          >
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">
          <EmptyState
            title="All caught up!"
            message="You have no new notifications."
            icon={Bell}
          />
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {items.map((n) => (
              <motion.div
                key={n._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className={`border p-5 rounded-2xl transition-all duration-300 ${
                  !n.isRead
                    ? 'border-purple-500/40 bg-purple-500/5'
                    : 'border-white/10 bg-[#17121F]'
                }`}
              >
                <div className="flex justify-between items-start gap-4">

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                        <Bell className="w-4 h-4 text-purple-400" />
                      </div>

                      <p className="font-semibold text-sm text-white">
                        {n.title}
                      </p>

                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-purple-400 shrink-0" />
                      )}
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {n.message}
                    </p>

                    <p className="text-xs text-gray-500 mt-3">
                      {new Date(n.createdAt).toLocaleString('en-PK')}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDelete(n._id)}
                    className="p-2 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
