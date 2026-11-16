
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Ticket,
  Calendar,
  Sparkles,
  ArrowRight,
  Bookmark,
  Compass,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../../services/api';
import StatusBadge from '../../components/StatusBadge';

export default function AttendeeDashboard() {
  const [regs, setRegs] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    Promise.all([
      API.get('/registrations/mine'),
      API.get('/bookmarks/mine')
    ])
      .then(([r, b]) => {
        setRegs(r.data.data);
        setBookmarks(b.data.data);
      })
      .catch(err => console.error(err));
  }, []);

  const activeRegs = regs.filter(r => r.status === 'registered').length;

  const stats = [
    {
      icon: Ticket,
      label: 'Total Registrations',
      value: regs.length,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
      link: '/attendee/registrations'
    },
    {
      icon: Calendar,
      label: 'Active Registrations',
      value: activeRegs,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      link: '/attendee/registrations'
    },
    {
      icon: Bookmark,
      label: 'Bookmarked Sessions',
      value: bookmarks.length,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
      link: '/attendee/bookmarks'
    }
  ];

  return (
    <div className="space-y-8 text-white max-w-7xl mx-auto">

      {/* WELCOME BANNER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-[#17121F] p-7 md:p-10"
      >
        <div className="absolute -right-20 -top-24 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-violet-500/10 blur-[80px] rounded-full"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-xs font-semibold mb-5">
            <Sparkles className="w-4 h-4" />
            YOUR EVENT JOURNEY STARTS HERE
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Welcome Back!
            <span className="block text-purple-400 mt-1">
              Ready for Your Next Experience?
            </span>
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-7 mb-7 max-w-xl">
            Discover exciting events, connect with professionals,
            manage your registrations and keep your event journey organized.
          </p>

          <Link
            to="/attendee/events"
            className="inline-flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-purple-900/30"
          >
            Explore Events
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      {/* STATISTICS */}
      <div>
        <div className="mb-5">
          <h3 className="text-xl font-bold">Your Overview</h3>
          <p className="text-gray-500 text-sm mt-1">
            A quick look at your event activities.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={s.link}
                className="block bg-[#17121F] border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>

                <h3 className="text-3xl font-bold mb-2">{s.value}</h3>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* EVENTS AND BOOKMARKS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* REGISTERED EVENTS */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#17121F] border border-white/10 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Ticket className="w-5 h-5 text-purple-400" />
                <h3 className="font-bold text-lg">My Registered Events</h3>
              </div>
              <p className="text-gray-500 text-xs">
                Events you have joined.
              </p>
            </div>

            <Link
              to="/attendee/registrations"
              className="text-purple-400 text-xs font-semibold hover:text-purple-300 flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {regs.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                <Ticket className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-gray-300 font-medium text-sm">
                No registrations yet
              </p>
              <p className="text-gray-500 text-xs mt-2 mb-5">
                Explore events and find your next experience.
              </p>
              <Link
                to="/attendee/events"
                className="text-purple-400 text-sm font-semibold hover:text-purple-300"
              >
                Explore Events →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {regs.slice(0, 4).map(r => (
                <div
                  key={r._id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0E0B16] border border-white/5 hover:border-purple-500/30 transition-all"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-white mb-2">
                      {r.event?.title}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        {r.event?.city}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-purple-400" />
                        {r.event?.startDate
                          ? new Date(r.event.startDate).toLocaleDateString('en-PK')
                          : 'Date TBA'}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={r.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* BOOKMARKED SESSIONS */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#17121F] border border-white/10 rounded-2xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Bookmark className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-lg">Saved Sessions</h3>
              </div>
              <p className="text-gray-500 text-xs">
                Your bookmarked event sessions.
              </p>
            </div>

            <Link
              to="/attendee/schedule"
              className="text-purple-400 text-xs font-semibold hover:text-purple-300 flex items-center gap-1"
            >
              View Schedule <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {bookmarks.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-white/10 rounded-xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center mb-4">
                <Bookmark className="w-6 h-6 text-pink-400" />
              </div>
              <p className="text-gray-300 font-medium text-sm">
                No saved sessions yet
              </p>
              <p className="text-gray-500 text-xs mt-2 mb-5">
                Bookmark sessions to organize your schedule.
              </p>
              <Link
                to="/attendee/schedule"
                className="text-purple-400 text-sm font-semibold hover:text-purple-300"
              >
                View Schedule →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.slice(0, 4).map(b => (
                <div
                  key={b._id}
                  className="p-4 rounded-xl bg-[#0E0B16] border border-white/5 hover:border-purple-500/30 transition-all"
                >
                  <p className="font-semibold text-sm text-white mb-2">
                    {b.session?.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3 text-purple-400" />
                    {b.session?.event?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

      </div>

      {/* QUICK ACTIONS */}
      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">
        <h3 className="font-bold text-lg mb-1">Quick Actions</h3>
        <p className="text-gray-500 text-sm mb-5">
          Access your event activities quickly.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            to="/attendee/events"
            className="flex items-center justify-between p-4 rounded-xl bg-[#0E0B16] border border-white/5 hover:border-purple-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">Discover Events</p>
                <p className="text-gray-500 text-xs mt-1">Find upcoming events</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
          </Link>

          <Link
            to="/attendee/registrations"
            className="flex items-center justify-between p-4 rounded-xl bg-[#0E0B16] border border-white/5 hover:border-purple-500/40 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Ticket className="w-5 h-5 text-pink-400" />
              </div>
              <div>
                <p className="font-semibold text-sm">My Tickets</p>
                <p className="text-gray-500 text-xs mt-1">Manage registrations</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
          </Link>
        </div>
      </div>

    </div>
  );
}
