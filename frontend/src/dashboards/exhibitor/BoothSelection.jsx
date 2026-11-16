
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../services/api';

export default function BoothSelection() {
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState('');
  const [booths, setBooths] = useState([]);

  useEffect(() => {
    API.get('/events?limit=50').then(r => {
      setEvents(r.data.data.events);
      if (r.data.data.events[0]) setSelected(r.data.data.events[0]._id);
    });
  }, []);

  const load = () => {
    if (selected) {
      API.get(`/booths/event/${selected}`).then(r => setBooths(r.data.data));
    }
  };

  useEffect(() => {
    load();
  }, [selected]);

  const reserve = async (boothId) => {
    try {
      await API.post('/booths/reserve', { boothId });
      toast.success('Booth reserved! Awaiting admin confirmation.');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const colors = {
    available: 'border-emerald-500/50 bg-emerald-500/10 hover:bg-emerald-500/20 cursor-pointer text-emerald-300',
    reserved: 'border-amber-500/50 bg-amber-500/10 cursor-not-allowed text-amber-300',
    occupied: 'border-rose-500/50 bg-rose-500/10 cursor-not-allowed text-rose-300',
  };

  return (
    <div className="text-white">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">Select a Booth</h2>

        <select
          value={selected}
          onChange={e => setSelected(e.target.value)}
          className="bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 max-w-xs outline-none focus:border-purple-500"
        >
          {events.map(e => (
            <option key={e._id} value={e._id}>{e.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 text-sm">
        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 rounded bg-emerald-500" />
          Available
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 rounded bg-amber-500" />
          Reserved
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 rounded bg-rose-500" />
          Occupied
        </span>
      </div>

      <div className="bg-[#17121F] border border-white/10 p-6 rounded-2xl">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {booths.map(b => (
            <div
              key={b._id}
              onClick={() => b.status === 'available' && reserve(b._id)}
              className={`border rounded-xl p-3 text-center text-xs transition-colors ${colors[b.status]}`}
            >
              <p className="font-bold">{b.boothNumber}</p>
              <p className="opacity-70">{b.category}</p>
              <p className="text-[10px] mt-1">
                PKR {b.price?.toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {booths.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No booths available for this event.
          </p>
        )}
      </div>
    </div>
  );
}
