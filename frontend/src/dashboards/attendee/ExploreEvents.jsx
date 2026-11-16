
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../services/api';

export default function ExploreEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get('/events?limit=50')
      .then(r => setEvents(r.data.data.events));
  }, []);

  const register = async (eventId) => {
    try {
      await API.post('/registrations', { eventId });
      toast.success('Registered successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Explore Events</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(e => (
          <div
            key={e._id}
            className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden group hover:border-purple-500/50 transition-colors"
          >
            <div className="h-40 overflow-hidden">
              <img
                src={e.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5">
              <h3 className="font-bold mb-1 line-clamp-1 text-white">
                {e.title}
              </h3>

              <p className="text-xs text-gray-400 mb-4">
                {e.city} · {new Date(e.startDate).toLocaleDateString('en-PK')}
              </p>

              <div className="flex gap-2">
                <Link
                  to={`/events/${e._id}`}
                  className="bg-[#211A2B] border border-white/10 text-white py-2.5 px-3 text-xs flex-1 text-center rounded-lg hover:border-purple-500/50 transition"
                >
                  Details
                </Link>

                <button
                  onClick={() => register(e._id)}
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-3 text-xs flex-1 rounded-lg transition"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
