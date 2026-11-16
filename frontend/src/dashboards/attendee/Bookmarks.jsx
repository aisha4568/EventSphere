
import { useEffect, useState } from 'react';
import { Bookmark as BIcon } from 'lucide-react';
import API from '../../services/api';
import EmptyState from '../../components/EmptyState';

export default function Bookmarks() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    API.get('/bookmarks/mine').then(r => setItems(r.data.data));
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Bookmarked Sessions</h2>

      {items.length === 0 ? (
        <EmptyState title="No bookmarks yet" icon={BIcon} />
      ) : (
        <div className="space-y-4">
          {items.map(b => (
            <div
              key={b._id}
              className="bg-[#17121F] border border-white/10 p-5 rounded-2xl hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                  <BIcon className="w-5 h-5 text-purple-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-white">
                    {b.session?.title}
                  </h3>

                  <p className="text-xs text-purple-400 mt-2">
                    {b.session?.event?.title} · {b.session?.hall}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
