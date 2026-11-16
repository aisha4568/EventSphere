
import { useEffect, useState } from 'react';
import { Bookmark, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

export default function Schedule() {
  const [sessions, setSessions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  const load = () =>
    Promise.all([
      API.get('/sessions'),
      API.get('/bookmarks/mine'),
    ]).then(([s, b]) => {
      setSessions(s.data.data);
      setBookmarks(b.data.data);
    });

  useEffect(() => {
    load();
  }, []);

  const isBookmarked = (id) =>
    bookmarks.some(b => b.session?._id === id);

  const toggle = async (sessionId) => {
    try {
      await API.post('/bookmarks/toggle', { sessionId });
      load();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>

      <div className="space-y-4">
        {sessions.map(s => (
          <div
            key={s._id}
            className="bg-[#17121F] border border-white/10 p-5 rounded-2xl flex items-start gap-4 hover:border-purple-500/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-purple-400" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-white">
                {s.title}
              </h3>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(s.startTime).toLocaleString('en-PK')} · {s.hall}
              </p>

              <p className="text-xs text-purple-400 mt-2">
                {s.event?.title}
              </p>

              {s.speaker && (
                <p className="text-xs text-gray-500 mt-1">
                  Speaker: {s.speaker.name}
                </p>
              )}
            </div>

            <button
              onClick={() => toggle(s._id)}
              className={`p-2 rounded-lg transition-colors ${
                isBookmarked(s._id)
                  ? 'bg-purple-500/15 text-purple-400'
                  : 'hover:bg-white/5 text-gray-400'
              }`}
            >
              <Bookmark
                className={`w-5 h-5 ${
                  isBookmarked(s._id) ? 'fill-purple-400' : ''
                }`}
              />
            </button>
          </div>
        ))}

        {sessions.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No sessions scheduled yet.
          </p>
        )}
      </div>
    </div>
  );
}
