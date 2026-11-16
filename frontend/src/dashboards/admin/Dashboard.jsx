
import { useEffect, useState } from 'react';
import {
  Calendar,
  Users,
  Building2,
  Grid3x3,
  TrendingUp,
  ArrowUpRight,
  Activity,
  ClipboardList
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import API from '../../services/api';
import PageLoader from '../../components/PageLoader';
import StatusBadge from '../../components/StatusBadge';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/analytics/dashboard')
      .then((r) => setData(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const stats = [
    {
      label: 'Total Events',
      value: data.stats.totalEvents,
      icon: Calendar,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      label: 'Upcoming Events',
      value: data.stats.upcoming,
      icon: TrendingUp,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      label: 'Exhibitors',
      value: data.stats.totalExhibitors,
      icon: Building2,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10'
    },
    {
      label: 'Attendees',
      value: data.stats.totalAttendees,
      icon: Users,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      label: 'Available Booths',
      value: data.stats.availableBooths,
      icon: Grid3x3,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10'
    },
    {
      label: 'Reserved Booths',
      value: data.stats.reservedBooths,
      icon: Grid3x3,
      color: 'text-orange-400',
      bg: 'bg-orange-500/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-7 text-white">

      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-purple-400">
            Overview
          </p>
          <h2 className="text-2xl font-bold">Dashboard Analytics</h2>
          <p className="mt-1 text-sm text-gray-500">
            Monitor your event platform performance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-purple-500/20 bg-purple-500/5 px-4 py-2.5 text-xs text-purple-300">
          <Activity size={16} />
          Platform Overview
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-2xl border border-white/10 bg-[#17121F] p-5 transition hover:-translate-y-1 hover:border-purple-500/30"
          >
            <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>

            <p className="mb-1 text-2xl font-bold">{s.value}</p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-500">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Registration Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-5 md:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Registration Trend</h3>
              <p className="mt-1 text-xs text-gray-500">
                Registration activity over time
              </p>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <TrendingUp size={19} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data.trend}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="_id"
                stroke="#85818D"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#85818D"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#21192D',
                  border: '1px solid rgba(168,85,247,0.3)',
                  borderRadius: 12,
                  color: '#fff'
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#A855F7"
                strokeWidth={3}
                dot={{ fill: '#A855F7', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 7, fill: '#C084FC' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Events */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-5 md:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Top Events</h3>
              <p className="mt-1 text-xs text-gray-500">
                Events ranked by attendance
              </p>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Calendar size={19} />
            </div>
          </div>

          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data.eventPerformance}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
                vertical={false}
              />
              <XAxis
                dataKey="title"
                stroke="#85818D"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                angle={-15}
                textAnchor="end"
                height={60}
              />
              <YAxis
                stroke="#85818D"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  background: '#21192D',
                  border: '1px solid rgba(168,85,247,0.3)',
                  borderRadius: 12,
                  color: '#fff'
                }}
                cursor={{ fill: 'rgba(168,85,247,0.06)' }}
              />
              <Bar
                dataKey="stats.attendeeCount"
                fill="#A855F7"
                radius={[6, 6, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Recent Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-5 md:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Recent Registrations</h3>
              <p className="mt-1 text-xs text-gray-500">
                Latest attendee registrations
              </p>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <Users size={19} />
            </div>
          </div>

          <div className="space-y-2">
            {data.recentRegs.slice(0, 5).map((r) => (
              <div
                key={r._id}
                className="flex items-center justify-between gap-3 rounded-xl border border-transparent p-3 transition hover:border-white/5 hover:bg-white/[0.03]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-sm font-bold text-purple-300">
                    {r.user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {r.user?.name || 'Attendee'}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {r.event?.title || 'Event'}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-gray-400">
                  {new Date(r.createdAt).toLocaleDateString('en-PK')}
                </span>
              </div>
            ))}

            {data.recentRegs.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">
                No recent registrations.
              </p>
            )}
          </div>
        </motion.div>

        {/* Recent Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-[#17121F] p-5 md:p-6"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Recent Applications</h3>
              <p className="mt-1 text-xs text-gray-500">
                Latest exhibitor applications
              </p>
            </div>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-400">
              <ClipboardList size={19} />
            </div>
          </div>

          <div className="space-y-2">
            {data.recentApplications.map((a) => (
              <div
                key={a._id}
                className="flex items-center justify-between gap-3 rounded-xl border border-transparent p-3 transition hover:border-white/5 hover:bg-white/[0.03]"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-sm font-bold text-purple-300">
                    {a.exhibitor?.companyName?.[0]?.toUpperCase() || 'E'}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {a.exhibitor?.companyName || 'Exhibitor'}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {a.event?.title || 'Event'}
                    </p>
                  </div>
                </div>

                <StatusBadge status={a.status} />
              </div>
            ))}

            {data.recentApplications.length === 0 && (
              <p className="py-8 text-center text-sm text-gray-500">
                No recent applications.
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}