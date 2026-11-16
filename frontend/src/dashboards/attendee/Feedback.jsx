
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { Star } from 'lucide-react';

export default function AttendeeFeedback() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    defaultValues: { rating: 5, category: 'general' }
  });

  const [items, setItems] = useState([]);
  const [events, setEvents] = useState([]);

  const load = () => Promise.all([
    API.get('/feedback/mine'),
    API.get('/registrations/mine'),
  ]).then(([f, r]) => {
    setItems(f.data.data);
    setEvents(r.data.data);
  });

  useEffect(() => {
    load();
  }, []);

  const submit = async (data) => {
    try {
      await API.post('/feedback', data);
      toast.success('Thank you for your feedback!');
      reset({ rating: 5, category: 'general' });
      load();
    } catch {
      toast.error('Failed');
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6 text-white">
      <div>
        <h2 className="text-2xl font-bold mb-6">Submit Feedback</h2>

        <form
          onSubmit={handleSubmit(submit)}
          className="bg-[#17121F] border border-white/10 p-6 rounded-2xl space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Event (optional)
            </label>

            <select
              {...register('event')}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="">General</option>
              {events.map(e => (
                <option key={e._id} value={e.event?._id}>
                  {e.event?.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Category
            </label>

            <select
              {...register('category')}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="general">General</option>
              <option value="bug">Bug Report</option>
              <option value="suggestion">Suggestion</option>
              <option value="issue">Issue</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Rating
            </label>

            <select
              {...register('rating', { valueAsNumber: true })}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              {[5, 4, 3, 2, 1].map(n => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Message
            </label>

            <textarea
              rows="4"
              {...register('message', { required: true })}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 resize-none"
              placeholder="Write your feedback..."
            />
          </div>

          <button
            disabled={isSubmitting}
            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold w-full py-3 rounded-xl transition-all"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">My Feedback</h2>

        <div className="space-y-3">
          {items.map(f => (
            <div
              key={f._id}
              className="bg-[#17121F] border border-white/10 p-5 rounded-2xl"
            >
              <div className="flex gap-1 mb-3 text-purple-400">
                {[...Array(f.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-purple-400"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">
                {f.message}
              </p>

              {f.adminReply && (
                <p className="text-xs text-purple-300 mt-3 bg-purple-500/10 border border-purple-500/20 p-3 rounded-lg">
                  Admin: {f.adminReply}
                </p>
              )}
            </div>
          ))}

          {items.length === 0 && (
            <p className="text-gray-500 text-sm bg-[#17121F] border border-white/10 p-5 rounded-xl">
              No feedback submitted yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
