
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LogIn, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const submit = async ({ email, password }) => {
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      navigate(`/${user.role}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0E0B16] relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[35%] h-[40%] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[40%] bg-[#7E22CE]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl bg-[#17121F] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-white/10 relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 relative bg-[#0E0B16] p-10 lg:p-12 flex-col justify-between overflow-hidden">

          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
              alt="Conference"
              className="w-full h-full object-cover opacity-45"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B16] via-[#0E0B16]/65 to-[#0E0B16]/10"></div>
          </div>

          <div className="relative z-10">
            <Logo />
          </div>

          <div className="relative z-10 mb-5 p-6 bg-[#17121F]/80 backdrop-blur-sm rounded-2xl border border-white/10">
            <h2 className="text-3xl font-extrabold mb-3 leading-tight text-white">
              Connect with the<br />Industry Leaders.
            </h2>

            <p className="text-sm text-gray-300 leading-6">
              Join professionals, exhibitors, and innovators
              at Pakistan's premier expo platform.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 p-7 sm:p-10 lg:p-14 relative bg-[#17121F]">

          <div className="absolute top-6 right-6 hidden md:block">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#A855F7] bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
            >
              <ArrowLeft className="w-3 h-3" />
              Back to website
            </Link>
          </div>

          <div className="md:hidden mb-8 text-center">
            <Logo />
          </div>

          <div className="max-w-md mx-auto mt-8 md:mt-10">

            <p className="text-[#A855F7] text-xs font-bold tracking-[2px] uppercase mb-3">
              Welcome to EventSphere
            </p>

            <h1 className="text-3xl font-bold mb-2 text-white">
              Welcome Back
            </h1>

            <p className="text-gray-400 text-sm mb-8">
              Sign in to your EventSphere account.
            </p>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  {...register('email', {
                    required: 'Email is required'
                  })}
                  className="w-full bg-[#0E0B16] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition"
                  placeholder="you@example.com"
                />

                {errors.email && (
                  <p className="text-rose-400 text-xs mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required'
                    })}
                    className="w-full bg-[#0E0B16] border border-white/10 rounded-xl px-4 py-3.5 pr-11 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#A855F7]"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </button>
                </div>

                {errors.password && (
                  <p className="text-rose-400 text-xs mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* FORGOT PASSWORD */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#A855F7] hover:text-white transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A855F7] hover:bg-[#9333EA] disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
              >
                <LogIn className="w-5 h-5" />
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>

            </form>

            <p className="text-center text-sm text-gray-400 mt-8">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="text-[#A855F7] font-semibold hover:text-white transition-colors"
              >
                Register now
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
