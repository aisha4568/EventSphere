
import { useForm } from 'react-hook-form';
import { Mail, ArrowLeft, LockKeyhole } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import Logo from '../../components/Logo';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const submit = async (data) => {
    try {
      await API.post('/auth/forgot-password', data);
      toast.success('If email exists, reset link has been sent');
    } catch {
      toast.error('Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0E0B16] px-4 py-10 relative overflow-hidden">

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#17121F] border border-white/10 rounded-2xl p-8 md:p-10 relative z-10 shadow-2xl">

        <div className="text-center mb-8">
          <div className="flex justify-center mb-7">
            <Logo />
          </div>

          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <LockKeyhole className="w-8 h-8 text-purple-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">
            Forgot Password?
          </h1>

          <p className="text-gray-400 text-sm leading-6">
            No worries! Enter your registered email address
            and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full bg-[#0E0B16] border border-white/10 rounded-xl text-white pl-12 pr-4 py-3.5 outline-none focus:border-purple-500 transition-colors placeholder:text-gray-600"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/20"
          >
            <Mail className="w-4 h-4" />
            {isSubmitting ? 'Sending...' : 'Send Reset Link'}
          </button>

        </form>

        <div className="mt-7 pt-6 border-t border-white/10 text-center">
          <Link
            to="/login"
            className="text-sm text-gray-400 hover:text-purple-400 flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}
