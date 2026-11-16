
import { useEffect, useState } from 'react';
import { Check, X, ClipboardList, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

export default function Applications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = () => {
    API.get('/exhibitors/applications')
      .then(r => setApps(r.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const update = async (id, status) => {
    try {
      await API.put(`/exhibitors/applications/${id}`, { status });
      toast.success(`Application ${status}!`);
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredApps = apps.filter(a =>
    a.exhibitor?.companyName?.toLowerCase().includes(search.toLowerCase()) ||
    a.event?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-white max-w-7xl mx-auto space-y-6">

      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Exhibitor Applications
          </h2>
          <p className="text-gray-400 text-sm mt-2">
            Review and manage companies applying for your events.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#17121F] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredApps.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl py-8">
          <EmptyState
            title="No applications found"
            message="Try adjusting your search."
            icon={ClipboardList}
          />
        </div>
      ) : (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden">

          {/* Table Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-white">
                All Applications
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Review exhibitor requests and their status
              </p>
            </div>

            <span className="text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg">
              {filteredApps.length} Applications
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-sm text-left whitespace-nowrap">

              <thead className="bg-[#211A2B] text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Company</th>
                  <th className="px-6 py-4 font-semibold">Event</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                <AnimatePresence>
                  {filteredApps.map(a => (
                    <motion.tr
                      key={a._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-purple-500/[0.04] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-300 font-bold text-lg">
                            {a.exhibitor?.companyName?.[0] || 'C'}
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {a.exhibitor?.companyName}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {a.exhibitor?.category}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-300">
                        {a.event?.title}
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={a.status} />
                      </td>

                      <td className="px-6 py-4 text-right">
                        {a.status === 'pending' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => update(a._id, 'approved')}
                              className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => update(a._id, 'rejected')}
                              className="p-2.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 bg-white/5 border border-white/5 px-3 py-2 rounded-lg">
                            Processed
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}
