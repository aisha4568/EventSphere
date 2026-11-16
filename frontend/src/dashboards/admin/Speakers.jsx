
import { useEffect, useState } from 'react';
import { Plus, Trash2, Mic2, UserRound } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';
import Modal from '../../components/Modal';

export default function Speakers() {
  const [speakers, setSpeakers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    title: '',
    company: '',
    bio: ''
  });

  const load = () => API.get('/speakers').then(r => setSpeakers(r.data.data));

  useEffect(() => {
    load();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    try {
      await API.post('/speakers', form);
      toast.success('Speaker added');
      setOpen(false);
      setForm({ name: '', title: '', company: '', bio: '' });
      load();
    } catch {
      toast.error('Failed to add speaker');
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/speakers/${id}`);
      toast.success('Speaker removed');
      load();
    } catch {
      toast.error('Failed to remove speaker');
    }
  };

  return (
    <div className="text-white">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold">Speakers</h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage event speakers and their profiles.
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          Add Speaker
        </button>
      </div>

      {/* Speaker Cards */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

        {speakers.map(s => (
          <div
            key={s._id}
            className="bg-[#17121F] border border-white/10 p-5 rounded-2xl hover:border-purple-500/40 transition"
          >
            <div className="flex justify-between items-start">

              <div className="w-14 h-14 rounded-xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xl font-bold">
                {s.name?.charAt(0)?.toUpperCase() || <UserRound />}
              </div>

              <button
                onClick={() => remove(s._id)}
                className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition"
                title="Remove Speaker"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <h3 className="font-bold text-white text-lg mt-4">
              {s.name}
            </h3>

            <p className="text-sm text-purple-400 mt-1">
              {s.title}
              {s.company && ` · ${s.company}`}
            </p>

            {s.bio && (
              <p className="text-sm text-gray-400 mt-3 leading-6 line-clamp-3">
                {s.bio}
              </p>
            )}
          </div>
        ))}

        {speakers.length === 0 && (
          <div className="col-span-full text-center py-16 bg-[#17121F] border border-white/10 rounded-2xl">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
              <Mic2 className="w-8 h-8 text-purple-400" />
            </div>

            <h3 className="text-white font-semibold text-lg">
              No Speakers Yet
            </h3>

            <p className="text-gray-400 text-sm mt-2">
              Add speakers to manage their event profiles.
            </p>
          </div>
        )}

      </div>

      {/* Add Speaker Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Speaker"
      >
        <form onSubmit={create} className="space-y-4">

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Speaker Name
            </label>
            <input
              required
              placeholder="Enter speaker name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Professional Title
            </label>
            <input
              placeholder="e.g. Software Engineer"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Company
            </label>
            <input
              placeholder="Enter company name"
              value={form.company}
              onChange={e => setForm({ ...form, company: e.target.value })}
              className="w-full bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Biography
            </label>
            <textarea
              placeholder="Write a short speaker biography"
              rows="4"
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              className="w-full bg-[#211A2B] border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition"
          >
            Add Speaker
          </button>

        </form>
      </Modal>

    </div>
  );
}
