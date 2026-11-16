
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { Ticket } from 'lucide-react';

export default function MyRegistrations() {
  const [regs, setRegs] = useState([]);

  const load = () =>
    API.get('/registrations/mine').then(r => setRegs(r.data.data));

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    try {
      await API.put(`/registrations/${id}/cancel`);
      toast.success('Cancelled');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">My Registrations</h2>

      {regs.length === 0 ? (
        <EmptyState
          title="No registrations yet"
          message="Browse events to register."
          icon={Ticket}
        />
      ) : (
        <div className="space-y-4">
          {regs.map(r => (
            <div
              key={r._id}
              className="bg-[#17121F] border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-purple-500/30 transition-colors"
            >
              <div>
                <p className="font-semibold text-white mb-2">
                  {r.event?.title}
                </p>

                <p className="text-xs text-gray-400">
                  {r.event?.venue}, {r.event?.city} ·{' '}
                  {r.event?.startDate
                    ? new Date(r.event.startDate).toLocaleDateString('en-PK')
                    : 'Date not available'}
                </p>

                <p className="text-xs mt-3 text-gray-300">
                  Ticket:
                  <code className="bg-[#211A2B] border border-white/10 px-2 py-1 rounded text-purple-300 ml-2">
                    {r.ticketCode}
                  </code>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <StatusBadge status={r.status} />

                {r.status === 'registered' && (
                  <button
                    onClick={() => cancel(r._id)}
                    className="text-xs px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 hover:bg-rose-500/20 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
