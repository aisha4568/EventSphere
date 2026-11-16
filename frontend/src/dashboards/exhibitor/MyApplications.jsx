
import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

export default function MyApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    API.get('/exhibitors/applications/mine')
      .then(r => setApps(r.data.data));
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      {apps.length === 0 ? (
        <EmptyState title="No applications yet" />
      ) : (
        <div className="space-y-4">
          {apps.map(a => (
            <div
              key={a._id}
              className="bg-[#17121F] border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 hover:border-purple-500/30 transition-colors"
            >
              <div>
                <p className="font-semibold text-white mb-2">
                  {a.event?.title}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {a.event?.city}
                  </p>

                  <p className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-400" />
                    {a.event?.startDate
                      ? new Date(a.event.startDate).toLocaleDateString('en-PK')
                      : 'Date not available'}
                  </p>
                </div>

                {a.adminNote && (
                  <p className="text-xs text-purple-300 mt-3">
                    Note: {a.adminNote}
                  </p>
                )}
              </div>

              <StatusBadge status={a.status} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
