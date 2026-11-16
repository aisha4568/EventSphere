
import { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

export default function BrowseExpos() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events?limit=50')
      .then(r => setEvents(r.data.data.events));
  }, []);

  const apply = async (eventId) => {
    try {
      await API.post('/exhibitors/applications', { eventId });
      toast.success('Application submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Browse Expos</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(e => (
          <div
            key={e._id}
            className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-colors"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={e.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="font-bold mb-2 line-clamp-1 text-white">
                {e.title}
              </h3>

              <div className="text-xs text-gray-400 space-y-2 mb-4">
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  {new Date(e.startDate).toLocaleDateString('en-PK')}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  {e.city}
                </p>
              </div>

              <button
                onClick={() => apply(e._id)}
                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold w-full py-2.5 rounded-xl transition-all text-sm"
              >
                Apply for Event
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
