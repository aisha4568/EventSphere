
import { useEffect, useState } from 'react';
import { Users, Ticket } from 'lucide-react';
import API from '../../services/api';
import EmptyState from '../../components/EmptyState';

export default function Attendees() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    API.get('/registrations').then(r => setRegs(r.data.data));
  }, []);

  return (
    <div className="text-white">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Attendee Registrations</h2>
        <p className="text-gray-400 text-sm mt-1">
          View and manage event attendee registrations.
        </p>
      </div>

      {/* Registration Count */}
      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5 mb-6 flex items-center gap-4 max-w-xs">
        <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <Users className="w-6 h-6 text-purple-400" />
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total Registrations</p>
          <h3 className="text-2xl font-bold text-white">{regs.length}</h3>
        </div>
      </div>

      {/* Registrations Table */}
      {regs.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">
          <EmptyState title="No registrations yet" />
        </div>
      ) : (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-[#211A2B] text-gray-400">
                <tr>
                  <th className="p-4 font-semibold">Attendee</th>
                  <th className="p-4 font-semibold">Email</th>
                  <th className="p-4 font-semibold">Event</th>
                  <th className="p-4 font-semibold">Ticket</th>
                  <th className="p-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">

                {regs.map(r => (
                  <tr key={r._id} className="hover:bg-purple-500/5 transition">

                    <td className="p-4 font-medium text-white">
                      {r.user?.name || 'N/A'}
                    </td>

                    <td className="p-4 text-gray-400">
                      {r.user?.email || 'N/A'}
                    </td>

                    <td className="p-4 text-gray-300">
                      {r.event?.title || 'N/A'}
                    </td>

                    <td className="p-4">
                      <code className="inline-flex items-center gap-2 text-xs bg-purple-500/10 border border-purple-500/20 px-3 py-2 rounded-lg text-purple-300">
                        <Ticket className="w-3.5 h-3.5" />
                        {r.ticketCode}
                      </code>
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        r.status === 'registered'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {r.status}
                      </span>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
