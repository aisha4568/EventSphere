
import { useEffect, useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';

export default function FeedbackAdmin() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/feedback').then(r => setItems(r.data.data));
  }, []);

  return (
    <div className="text-white">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Feedback & Reports</h2>
        <p className="text-gray-400 text-sm mt-1">
          Review feedback and ratings submitted by attendees.
        </p>
      </div>

      {/* Feedback Count */}
      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5 mb-6 flex items-center gap-4 max-w-xs">
        <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-purple-400" />
        </div>

        <div>
          <p className="text-gray-400 text-sm">Total Feedback</p>
          <h3 className="text-2xl font-bold">{items.length}</h3>
        </div>
      </div>

      {/* Feedback List */}
      {items.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">
          <EmptyState title="No feedback yet" icon={MessageSquare} />
        </div>
      ) : (
        <div className="space-y-4">

          {items.map(f => (
            <div
              key={f._id}
              className="bg-[#17121F] border border-white/10 p-5 rounded-2xl hover:border-purple-500/30 transition"
            >

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                <div className="flex-1 min-w-0">

                  <div className="flex flex-wrap items-center gap-3 mb-4">

                    <div className="w-9 h-9 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 font-bold">
                      {f.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>

                    <p className="font-semibold text-white">
                      {f.user?.name || 'Unknown User'}
                    </p>

                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (f.rating || 0)
                              ? 'fill-purple-400 text-purple-400'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>

                    <StatusBadge status={f.status} />

                  </div>

                  <p className="text-sm text-gray-300 bg-[#211A2B] p-4 rounded-xl border border-white/5 leading-6">
                    {f.message}
                  </p>

                  {f.event && (
                    <p className="text-xs text-purple-400 mt-3">
                      Event: {f.event.title}
                    </p>
                  )}

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}
