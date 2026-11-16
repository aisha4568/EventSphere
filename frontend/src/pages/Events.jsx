
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import API from '../services/api';
import SkeletonCard from '../components/SkeletonCard';
import EmptyState from '../components/EmptyState';

const cities = ['Karachi','Lahore','Islamabad','Rawalpindi','Faisalabad','Multan','Peshawar','Quetta','Hyderabad','Sialkot'];
const categories = ['Technology','Business','Fashion','Healthcare','Education','E-Commerce','Startup','Other'];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({ page, limit: 9 });
    if (search) params.append('search', search);
    if (city) params.append('city', city);
    if (category) params.append('category', category);

    API.get(`/events?${params}`).then((res) => {
      setEvents(res.data.data.events);
      setPages(res.data.data.pages);
    }).finally(() => setLoading(false));
  }, [search, city, category, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-[#0A0A0A] min-h-screen text-white">

      {/* PAGE HEADING */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold mb-2">
          All <span className="text-[#A855F7]">Events</span>
        </h1>
        <p className="text-gray-400">
          Explore expos, conferences and summits across Pakistan.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-[#121212] border border-purple-900/40 rounded-2xl p-4 mb-10 grid md:grid-cols-3 gap-3">

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A855F7]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search events..."
            className="input w-full bg-[#0A0A0A] border-purple-900/40 pl-11 text-white focus:border-[#7E22CE]"
          />
        </div>

        <select
          value={city}
          onChange={(e) => { setCity(e.target.value); setPage(1); }}
          className="input bg-[#0A0A0A] border-purple-900/40 text-white focus:border-[#7E22CE]"
        >
          <option value="">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          className="input bg-[#0A0A0A] border-purple-900/40 text-white focus:border-[#7E22CE]"
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

      </div>

      {/* EVENTS */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-7">
          {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="No events found"
          message="Try adjusting your filters."
          icon={Calendar}
        />
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

            {events.map((ev) => (
              <div
                key={ev._id}
                className="bg-[#121212] rounded-2xl overflow-hidden border border-purple-900/40 group hover:border-[#7E22CE] hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_12px_30px_rgba(126,34,206,0.15)]"
              >

                {/* EVENT IMAGE */}
                <div className="relative h-56 overflow-hidden">

                  <img
                    src={ev.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                    alt={ev.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* CATEGORY */}
                  <div className="absolute top-4 left-4 bg-[#7E22CE] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    {ev.category}
                  </div>

                  {/* DATE */}
                  <div className="absolute top-4 right-4 bg-[#121212]/90 border border-purple-400/40 text-white rounded-lg px-2.5 py-1.5 text-center shadow-md">
                    <p className="text-[9px] uppercase text-[#C084FC] font-bold leading-tight">
                      {new Date(ev.startDate).toLocaleString('default', { month: 'short' })}
                    </p>
                    <p className="text-base font-bold leading-tight">
                      {new Date(ev.startDate).getDate()}
                    </p>
                  </div>

                </div>

                {/* EVENT INFORMATION */}
                <div className="p-5">

                  <h3 className="font-bold text-xl mb-3 line-clamp-1 text-white group-hover:text-[#C084FC] transition-colors">
                    {ev.title}
                  </h3>

                  <div className="space-y-2 text-sm text-gray-400 mb-5">

                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                      {new Date(ev.startDate).toLocaleDateString('en-PK', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>

                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#A855F7] flex-shrink-0" />
                      <span className="line-clamp-1">
                        {ev.venue ? `${ev.venue}, ` : ''}{ev.city}
                      </span>
                    </p>

                  </div>

                  {/* BUTTON */}
                  <div className="border-t border-purple-900/40 pt-4">
                    <Link
                      to={`/events/${ev._id}`}
                      className="flex items-center justify-between w-full bg-[#7E22CE] text-white font-bold px-4 py-3 rounded-xl hover:bg-[#581C87] transition-all"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(pages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-lg font-semibold transition ${
                  page === i + 1
                    ? 'bg-[#7E22CE] text-white'
                    : 'bg-[#121212] text-white border border-purple-900/40 hover:bg-[#581C87]'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
