
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Building2, Save } from 'lucide-react';
import API from '../../services/api';

export default function ExhibitorProfileEdit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm();

  useEffect(() => {
    API.get('/exhibitors/me').then(r => reset(r.data.data));
  }, []);

  const submit = async (data) => {
    try {
      await API.put('/exhibitors/me', data);
      toast.success('Profile updated');
    } catch {
      toast.error('Update failed');
    }
  };

  const inputStyle =
    "w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition placeholder:text-gray-500";

  const labelStyle = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="max-w-4xl text-white">

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-11 h-11 rounded-xl bg-purple-500/15 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold">My Company Profile</h2>
        </div>

        <p className="text-sm text-gray-400">
          Manage your company information and contact details.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="bg-[#17121F] border border-white/10 p-6 md:p-8 rounded-2xl space-y-6"
      >

        <div>
          <label className={labelStyle}>Company Name</label>
          <input
            {...register('companyName', { required: true })}
            placeholder="Enter company name"
            className={inputStyle}
          />
        </div>

        <div>
          <label className={labelStyle}>Description</label>
          <textarea
            rows="4"
            {...register('description')}
            placeholder="Describe your company..."
            className={`${inputStyle} resize-none`}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className={labelStyle}>Category</label>
            <input
              {...register('category')}
              placeholder="e.g. Technology"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>City</label>
            <input
              {...register('city')}
              placeholder="Enter city"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Email</label>
            <input
              type="email"
              {...register('email')}
              placeholder="company@example.com"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Phone</label>
            <input
              {...register('phone')}
              placeholder="Enter phone number"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Website</label>
            <input
              {...register('website')}
              placeholder="https://example.com"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Address</label>
            <input
              {...register('address')}
              placeholder="Enter company address"
              className={inputStyle}
            />
          </div>

        </div>

        <div className="pt-4 border-t border-white/10 flex justify-start">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? 'Saving...' : 'Save Profile'}
          </button>
        </div>

      </form>
    </div>
  );
}
