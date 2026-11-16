
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, ArrowRight } from 'lucide-react';
import API from '../services/api';

export default function Exhibitors() {
  const [exhibitors, setExhibitors] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);

    API.get(`/exhibitors?${params}`)
      .then((r) => setExhibitors(r.data.data.exhibitors || []))
      .finally(() => setLoading(false));
  }, [search, category]);

  return (
    <div className="bg-[#0E0B16] min-h-screen text-white">

      <div className="max-w-7xl mx-auto px-4 py-14">

        {/* Page Heading */}
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-[3px] text-purple-400 mb-3">
            OUR EXHIBITORS
          </p>

          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">
            Exhibitor <span className="text-purple-400">Directory</span>
          </h1>

          <p className="text-gray-400 max-w-2xl leading-7">
            Discover companies, explore their products and connect with businesses showcasing at our events.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5 mb-10 grid md:grid-cols-2 gap-4">

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />

            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search company..."
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 placeholder:text-gray-500"
            />
          </div>

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
          >
            <option value="">All Categories</option>
            {['Technology', 'Business', 'Fashion', 'Healthcare', 'Education', 'E-Commerce', 'Startup', 'Other'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

        </div>

        {/* Exhibitor List */}
        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-[#17121F] border border-white/5 rounded-2xl p-6 h-56 animate-pulse"
              />
            ))}
          </div>
        ) : exhibitors.length === 0 ? (
          <div className="bg-[#17121F] border border-purple-500/20 rounded-2xl py-16 px-6 text-center">

            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <Building2 className="w-8 h-8 text-purple-400" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              No Exhibitors Found
            </h3>

            <p className="text-gray-400 text-sm">
              Try a different search or category.
            </p>

          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {exhibitors.map((x) => (
              <Link
                key={x._id}
                to={`/exhibitors/${x._id}`}
                className="bg-[#17121F] border border-white/10 rounded-2xl p-6 text-center hover:border-purple-500/50 hover:-translate-y-1 transition-all duration-300 group"
              >

                <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/20 mx-auto flex items-center justify-center text-2xl font-bold text-purple-400 mb-5 group-hover:bg-purple-500/25 transition">
                  {x.companyName?.[0]?.toUpperCase() || 'E'}
                </div>

                <h3 className="font-bold text-white truncate">
                  {x.companyName}
                </h3>

                <p className="text-xs text-purple-400 mt-2 mb-3 font-medium">
                  {x.category}
                </p>

                <p className="text-sm text-gray-400 mb-5 line-clamp-2 leading-relaxed">
                  {x.description}
                </p>

                <span className="inline-flex items-center gap-2 text-sm text-white font-semibold group-hover:text-purple-400 transition-colors">
                  View Profile
                  <ArrowRight className="w-4 h-4" />
                </span>

              </Link>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}
