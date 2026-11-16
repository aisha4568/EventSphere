
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import API from '../../services/api';

const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Hyderabad', 'Sialkot'];
const categories = ['Technology', 'Business', 'Fashion', 'Healthcare', 'Education', 'E-Commerce', 'Startup', 'Other'];

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    if (isEdit) {
      API.get(`/events/${id}`).then((r) => {
        const e = r.data.data;

        reset({
          ...e,
          startDate: e.startDate?.slice(0, 10),
          endDate: e.endDate?.slice(0, 10),
          registrationDeadline: e.registrationDeadline?.slice(0, 10)
        });
      });
    }
  }, [id]);

  const submit = async (data) => {
    try {
      if (isEdit) {
        await API.put(`/events/${id}`, data);
      } else {
        await API.post('/events', data);
      }

      toast.success(isEdit ? 'Event updated' : 'Event created');
      navigate('/admin/events');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    }
  };

  const inputStyle = "w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-purple-500 transition-all";
  const labelStyle = "block text-sm font-medium text-gray-400 mb-2";

  return (
    <div className="text-white space-y-6">

      {/* Heading */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold">
          {isEdit ? 'Edit Event' : 'Create New Event'}
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          {isEdit
            ? 'Update your event information and details.'
            : 'Add the details below to create a new event.'}
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-[#17121F] border border-white/10 p-5 md:p-7 rounded-2xl space-y-6 max-w-4xl"
      >

        {/* Basic Information */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Event Information</h3>
              <p className="text-gray-500 text-xs mt-1">Basic details about your event</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className={labelStyle}>Event Title</label>
              <input
                {...register('title', { required: true })}
                className={inputStyle}
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                rows="4"
                {...register('description', { required: true })}
                className={`${inputStyle} resize-y`}
                placeholder="Describe your event..."
              />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Event Details */}
        <div>
          <h3 className="font-semibold text-white mb-5">Event Details</h3>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className={labelStyle}>Theme</label>
              <input
                {...register('theme')}
                className={inputStyle}
                placeholder="Event theme"
              />
            </div>

            <div>
              <label className={labelStyle}>Category</label>
              <select
                {...register('category', { required: true })}
                className={inputStyle}
              >
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className={labelStyle}>City</label>
              <select
                {...register('city', { required: true })}
                className={inputStyle}
              >
                {cities.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className={labelStyle}>Venue</label>
              <input
                {...register('venue', { required: true })}
                className={inputStyle}
                placeholder="Enter venue name"
              />
            </div>

            <div>
              <label className={labelStyle}>Start Date</label>
              <input
                type="date"
                {...register('startDate', { required: true })}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>End Date</label>
              <input
                type="date"
                {...register('endDate', { required: true })}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Registration Deadline</label>
              <input
                type="date"
                {...register('registrationDeadline')}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Capacity</label>
              <input
                type="number"
                {...register('capacity')}
                defaultValue={1000}
                className={inputStyle}
                placeholder="1000"
              />
            </div>

            <div>
              <label className={labelStyle}>Price (PKR)</label>
              <input
                type="number"
                {...register('price')}
                defaultValue={0}
                className={inputStyle}
                placeholder="0"
              />
            </div>

            <div>
              <label className={labelStyle}>Banner URL</label>
              <input
                {...register('banner')}
                className={inputStyle}
                placeholder="https://..."
              />
            </div>

          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Publishing Options */}
        <div>
          <h3 className="font-semibold text-white mb-4">Publishing Options</h3>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                {...register('isPublished')}
                className="w-4 h-4 accent-purple-500"
              />
              Published
            </label>

            <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                {...register('isFeatured')}
                className="w-4 h-4 accent-purple-500"
              />
              Featured
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 bg-[#7E22CE] hover:bg-[#9333EA] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Event'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/admin/events')}
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
