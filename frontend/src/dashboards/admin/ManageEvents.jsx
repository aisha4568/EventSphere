
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import ConfirmDialog from '../../components/ConfirmDialog';

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [confirm, setConfirm] = useState(null);

  const load = () =>
    API.get('/events?published=false&limit=100')
      .then((r) => setEvents(r.data.data.events));

  useEffect(() => {
    load();
  }, []);

  const remove = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      toast.success('Event deleted');
      setConfirm(null);
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="text-white space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Manage Events
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Create, update and manage all your events.
          </p>
        </div>

        <Link
          to="/admin/events/new"
          className="inline-flex items-center justify-center gap-2 bg-[#7E22CE] hover:bg-[#9333EA] text-white font-semibold py-3 px-5 rounded-xl transition-all shadow-lg shadow-purple-900/20"
        >
          <Plus className="w-5 h-5" />
          New Event
        </Link>
      </div>

      {/* Events Table */}
      {events.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl py-16 px-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/10 flex items-center justify-center mb-5">
            <Calendar className="w-8 h-8 text-purple-400" />
          </div>

          <h3 className="text-xl font-semibold text-white">
            No Events Yet
          </h3>

          <p className="text-gray-400 text-sm mt-2 mb-6">
            You haven't created any events. Start by adding your first event.
          </p>

          <Link
            to="/admin/events/new"
            className="inline-flex items-center gap-2 bg-[#7E22CE] hover:bg-[#9333EA] text-white font-semibold px-5 py-3 rounded-xl transition"
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Link>
        </div>
      ) : (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden">

          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">All Events</h3>
              <p className="text-gray-500 text-xs mt-1">
                Your event listings and their current status
              </p>
            </div>

            <span className="text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg">
              {events.length} Events
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm text-left">

              <thead className="bg-[#211A2B] text-gray-400">
                <tr>
                  <th className="px-5 py-4 font-semibold">Event</th>
                  <th className="px-5 py-4 font-semibold">City</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Start Date</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {events.map((e) => (
                  <tr
                    key={e._id}
                    className="hover:bg-purple-500/[0.04] transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">
                        {e.title}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-400" />
                        {e.city}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-lg text-xs font-medium">
                        {e.category}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-400">
                      {new Date(e.startDate).toLocaleDateString('en-PK')}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          e.isPublished
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {e.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/events/${e._id}`}
                          title="Edit Event"
                          className="p-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-lg text-purple-300 transition"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setConfirm(e._id)}
                          title="Delete Event"
                          className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg text-rose-400 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onConfirm={() => remove(confirm)}
        title="Delete Event?"
        message="This action cannot be undone."
        confirmText="Delete"
        danger
      />

    </div>
  );
}
