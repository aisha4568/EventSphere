
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Building2, Clock, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import PageLoader from '../components/PageLoader';

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    Promise.all([API.get(`/events/${id}`), API.get(`/sessions/event/${id}`)])
      .then(([e, s]) => {
        setEvent(e.data.data);
        setSessions(s.data.data);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const register = async () => {
    if (!user) return navigate('/login');
    if (user.role !== 'attendee') return toast.error('Only attendees can register');

    setRegistering(true);

    try {
      await API.post('/registrations', { eventId: id });
      toast.success('Registration confirmed!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to register');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!event) return <div className="text-center py-20 text-white">Event not found</div>;

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pb-20">

      {/* EVENT BANNER */}
      <div className="relative h-96">
        <img
          src={event.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600'}
          alt=""
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 pb-8">

          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-gray-300 hover:text-[#A855F7] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <span className="inline-block bg-[#7E22CE] text-white font-bold text-sm px-4 py-2 rounded-full mb-3">
            {event.category}
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white">
            {event.title}
          </h1>

          <p className="text-gray-300 text-lg">{event.theme}</p>
        </div>
      </div>

      {/* EVENT CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

      
{/* ABOUT EVENT */}
<div className="bg-[#121212] border border-white/10 p-7 rounded-2xl shadow-lg">
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1 h-8 bg-[#A855F7] rounded-full"></div>
    <h2 className="text-2xl font-bold text-white">
      About This Event
    </h2>
  </div>

  <p className="text-gray-400 text-base leading-8">
    {event.description}
  </p>
</div>


       
{/* SCHEDULE */}
<div className="bg-[#121212] border border-white/10 p-7 rounded-2xl shadow-lg">
  <div className="flex items-center gap-3 mb-5">
    <div className="w-1 h-8 bg-[#A855F7] rounded-full"></div>
    <h2 className="text-2xl font-bold text-white">
      Schedule
    </h2>
  </div>

  {sessions.length === 0 ? (
    <p className="text-gray-500 leading-relaxed">
      Schedule will be announced soon.
    </p>
  ) : (
    <div className="space-y-4">
      {sessions.map((s) => (
        <div
          key={s._id}
          className="p-5 rounded-xl bg-[#0A0A0A] border border-purple-900/30 flex items-start gap-4 hover:border-purple-500/40 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-[#7E22CE]/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-[#A855F7]" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg mb-2">
              {s.title}
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              {new Date(s.startTime).toLocaleString('en-PK')} · {s.hall}
            </p>

            {s.speaker && (
              <p className="text-sm text-[#A855F7] mt-2">
                Speaker: {s.speaker.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )}
</div>
</div>


        {/* EVENT INFORMATION */}
        <div className="lg:col-span-1">
          <div className="bg-[#121212] border border-purple-900/40 p-6 rounded-2xl sticky top-24">
<div className="flex items-center gap-3 mb-6">
  <div className="w-1 h-8 bg-[#A855F7] rounded-full"></div>
  <h2 className="text-2xl font-bold text-white">
    Event Information
  </h2>
</div>
            <div className="space-y-4 mb-6">

              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#A855F7]" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold text-white">
                    {new Date(event.startDate).toLocaleDateString('en-PK', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#A855F7]" />
                <div>
                  <p className="text-xs text-gray-500">Venue</p>
                  <p className="font-semibold text-white">
                    {event.venue}, {event.city}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-[#A855F7]" />
                <div>
                  <p className="text-xs text-gray-500">Capacity</p>
                  <p className="font-semibold text-white">
                    {event.capacity} attendees
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#A855F7]" />
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-semibold text-white">
                    {event.price ? `PKR ${event.price.toLocaleString()}` : 'Free'}
                  </p>
                </div>
              </div>

            </div>

            {/* REGISTER BUTTON */}
            <button
              onClick={register}
              disabled={registering}
              className="bg-[#7E22CE] text-white font-bold w-full py-3 rounded-xl hover:bg-[#581C87] hover:shadow-[0_0_20px_rgba(126,34,206,0.35)] transition-all disabled:opacity-60"
            >
              {registering ? 'Registering...' : 'Register Now'}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
