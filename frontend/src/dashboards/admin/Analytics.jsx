
import { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import API from '../../services/api';
import PageLoader from '../../components/PageLoader';

const COLORS = ['#A855F7', '#7E22CE', '#C084FC'];

export default function Analytics() {
  const [occupancy, setOccupancy] = useState([]);
  const [byEvent, setByEvent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/analytics/booth-occupancy'),
      API.get('/analytics/registrations-by-event')
    ])
      .then(([o, b]) => {
        setOccupancy(o.data.data);
        setByEvent(b.data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const tooltipStyle = {
    background: '#17121F',
    border: '1px solid rgba(168,85,247,0.25)',
    borderRadius: 12,
    color: '#fff'
  };

  return (
    <div className="space-y-6 text-white">

      {/* Heading */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Analytics & Reports
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Monitor booth occupancy and event registrations.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Booth Occupancy */}
        <div className="bg-[#17121F] border border-white/10 p-6 rounded-2xl">
          <div className="mb-5">
            <h3 className="font-semibold text-lg text-white">
              Booth Occupancy
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Overview of booth status across events
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={occupancy}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ _id, count }) => `${_id}: ${count}`}
              >
                {occupancy.map((_, i) => (
                  <Cell
                    key={i}
                    fill={COLORS[i % COLORS.length]}
                    stroke="#17121F"
                    strokeWidth={3}
                  />
                ))}
              </Pie>

              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Registrations by Event */}
        <div className="bg-[#17121F] border border-white/10 p-6 rounded-2xl">
          <div className="mb-5">
            <h3 className="font-semibold text-lg text-white">
              Registrations by Event
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Compare registrations for different events
            </p>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byEvent} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />

              <XAxis
                type="number"
                stroke="#9CA3AF"
                fontSize={11}
              />

              <YAxis
                type="category"
                dataKey="title"
                stroke="#9CA3AF"
                fontSize={10}
                width={120}
              />

              <Tooltip contentStyle={tooltipStyle} />

              <Bar
                dataKey="count"
                fill="#A855F7"
                radius={[0, 6, 6, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
