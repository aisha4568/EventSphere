
import { useEffect, useState } from 'react';
import { Grid3x3, Plus, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

export default function Booths() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState('');
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    API.get('/events?published=false&limit=100').then(r => {
      setEvents(r.data.data.events);
      if (r.data.data.events[0]) {
        setSelected(r.data.data.events[0]._id);
      }
    });
  }, []);

  useEffect(() => {
    if (selected) {
      API.get(`/booths/event/${selected}`)
        .then(r => setBooths(r.data.data));
    } else {
      setBooths([]);
    }
  }, [selected]);

  const createBooths = async () => {
    if (!selected) {
      toast.error('Please select an event first');
      return;
    }

    const newBooths = [];

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 6; col++) {
        newBooths.push({
          boothNumber: `B${row + 1}${String(col + 1).padStart(2, '0')}`,
          category: ['Standard', 'Premium', 'Deluxe', 'Corner'][(row + col) % 4],
          price: 25000 + ((row + col) % 4) * 15000,
          size: '3m x 3m',
          position: { row, col }
        });
      }
    }

    try {
      await API.post('/booths', {
        eventId: selected,
        booths: newBooths
      });

      toast.success('24 booths created');

      API.get(`/booths/event/${selected}`)
        .then(r => setBooths(r.data.data));

    } catch {
      toast.error('Failed to create booths');
    }
  };

  const colors = {
    available: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    reserved: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
    occupied: 'bg-rose-500/10 border-rose-500/30 text-rose-400'
  };

  const available = booths.filter(b => b.status === 'available').length;
  const reserved = booths.filter(b => b.status === 'reserved').length;
  const occupied = booths.filter(b => b.status === 'occupied').length;

  return (
    <div className="text-white space-y-6">

      {/* Heading */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          Booth Management
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Manage event booths and monitor their availability.
        </p>
      </div>

      {/* Event Selection */}
      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div>
            <h3 className="font-semibold text-white">
              Select Event
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Choose an event to view its booth arrangement.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 min-w-[220px]"
            >
              <option value="">Select an event</option>
              {events.map(e => (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              ))}
            </select>

            <button
              onClick={createBooths}
              disabled={!selected}
              className="flex items-center justify-center gap-2 bg-[#7E22CE] hover:bg-[#9333EA] disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              <Plus className="w-4 h-4" />
              Add Booths
            </button>
          </div>
        </div>
      </div>

      {/* Booth Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <div className="bg-[#17121F] border border-emerald-500/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Available Booths</p>
          <h3 className="text-3xl font-bold text-emerald-400 mt-2">
            {available}
          </h3>
        </div>

        <div className="bg-[#17121F] border border-amber-500/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Reserved Booths</p>
          <h3 className="text-3xl font-bold text-amber-400 mt-2">
            {reserved}
          </h3>
        </div>

        <div className="bg-[#17121F] border border-rose-500/20 rounded-2xl p-5">
          <p className="text-gray-400 text-sm">Occupied Booths</p>
          <h3 className="text-3xl font-bold text-rose-400 mt-2">
            {occupied}
          </h3>
        </div>

      </div>

      {/* Booth Layout */}
      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5 md:p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Booth Arrangement
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Visual overview of event booth positions.
            </p>
          </div>

          <span className="text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-lg">
            {booths.length} Total Booths
          </span>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mb-6 text-sm">
          <span className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded bg-emerald-400" />
            Available
          </span>

          <span className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded bg-amber-400" />
            Reserved
          </span>

          <span className="flex items-center gap-2 text-gray-400">
            <span className="w-3 h-3 rounded bg-rose-400" />
            Occupied
          </span>
        </div>

        {booths.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-xl">
            <Grid3x3 className="w-10 h-10 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold">
              No Booths Available
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Add booths to see the event arrangement here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-2">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 min-w-[320px]">
              {booths.map(b => (
                <div
                  key={b._id}
                  className={`border rounded-xl p-4 text-center transition-colors ${colors[b.status] || 'bg-purple-500/10 border-purple-500/20 text-purple-300'}`}
                >
                  <Grid3x3 className="w-5 h-5 mx-auto mb-2 opacity-80" />
                  <p className="font-bold text-sm">
                    {b.boothNumber}
                  </p>
                  <p className="text-xs opacity-70 mt-1">
                    {b.category}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
