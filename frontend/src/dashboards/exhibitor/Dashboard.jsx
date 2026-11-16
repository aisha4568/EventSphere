
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  ClipboardList,
  Grid3x3,
  ArrowRight,
  MapPin,
  Plus,
  Store
} from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

export default function ExhibitorDashboard() {
  const [profile, setProfile] = useState(null);
  const [apps, setApps] = useState([]);
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/exhibitors/me'),
      API.get('/exhibitors/applications/mine'),
      API.get('/booths/mine')
    ]).then(([p, a, b]) => {
      setProfile(p.data.data);
      setApps(a.data.data);
      setBooths(b.data.data);
    });
  }, []);

  const stats = [
    {
      icon: Building2,
      label: 'Company Status',
      value: profile?.companyName ? 'Active' : 'Incomplete',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      icon: ClipboardList,
      label: 'Total Applications',
      value: apps.length,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Grid3x3,
      label: 'Booths Reserved',
      value: booths.length,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-white">

      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-[#21152F] via-[#17121F] to-[#17121F] p-8 md:p-10"
      >
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-purple-600/10 blur-[90px]" />

        <div className="relative z-10 max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-purple-400">
            Exhibitor Workspace
          </p>

          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Welcome, {profile?.companyName || 'Exhibitor'}!
          </h2>

          <p className="mb-7 max-w-xl text-sm leading-7 text-gray-400">
            Manage your company profile, apply for upcoming expos, and keep
            track of your booth reservations from one place.
          </p>

          <Link
            to="/exhibitor/expos"
            className="inline-flex items-center gap-2 rounded-xl bg-[#A855F7] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#9333EA]"
          >
            Explore Events
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="absolute bottom-0 right-8 hidden opacity-10 md:block">
          <Building2 size={190} />
        </div>
      </motion.div>

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-white/10 bg-[#17121F] p-6 transition hover:border-purple-500/30"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <span className="text-xs text-gray-500">Overview</span>
            </div>

            <h3 className="mb-1 text-2xl font-bold">{item.value}</h3>
            <p className="text-sm text-gray-400">{item.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Applications and Booths */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Recent Applications</h3>
              <p className="mt-1 text-xs text-gray-500">Your latest event requests</p>
            </div>

            <Link
              to="/exhibitor/applications"
              className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {apps.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-[#0E0B16] px-5 py-10 text-center">
              <ClipboardList className="mx-auto mb-3 h-9 w-9 text-purple-400" />
              <p className="mb-1 text-sm font-semibold text-gray-300">
                No applications yet
              </p>
              <p className="mb-5 text-xs text-gray-500">
                Apply for an event to see your requests here.
              </p>
              <Link
                to="/exhibitor/expos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300"
              >
                Browse Events <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {apps.slice(0, 4).map(a => (
                <div
                  key={a._id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0E0B16] p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {a.event?.title || 'Event'}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} />
                      {a.event?.city || 'Location not available'}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* My Booths */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">My Booths</h3>
              <p className="mt-1 text-xs text-gray-500">Your reserved exhibition spaces</p>
            </div>

            <Link
              to="/exhibitor/booths"
              className="flex items-center gap-1 text-xs font-semibold text-purple-400 hover:text-purple-300"
            >
              Manage <ArrowRight size={14} />
            </Link>
          </div>

          {booths.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-[#0E0B16] px-5 py-10 text-center">
              <Store className="mx-auto mb-3 h-9 w-9 text-purple-400" />
              <p className="mb-1 text-sm font-semibold text-gray-300">
                No booths reserved
              </p>
              <p className="text-xs text-gray-500">
                Your reserved booths will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {booths.map(b => (
                <div
                  key={b._id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-[#0E0B16] p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-sm font-bold text-purple-400">
                      {b.booth?.boothNumber || 'N/A'}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">
                        {b.event?.title || 'Event'}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {b.booth?.category || 'Booth'}
                      </p>
                    </div>
                  </div>

                  <StatusBadge status={b.status} />
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Action */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-purple-500/20 bg-[#17121F] p-6 md:flex-row md:items-center">
        <div>
          <h3 className="text-lg font-bold">Ready to Grow Your Business?</h3>
          <p className="mt-1 text-sm text-gray-400">
            Discover new exhibitions and connect with potential customers.
          </p>
        </div>

        <Link
          to="/exhibitor/expos"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          <Plus size={17} />
          Apply for an Event
        </Link>
      </div>

    </div>
  );
}
