
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlus, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/Logo';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: { role: 'attendee' }
  });

  const submit = async (data) => {
    try {
      const fullName = `${data.firstName} ${data.lastName}`.trim();

      const payload = {
        name: fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        role: data.role
      };

      const user = await registerUser(payload);
      toast.success('Account created successfully!');
      navigate(`/${user.role}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const inputStyle = "w-full bg-[#0E0B16] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7]/30 transition";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#0E0B16] relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-10%] right-[-10%] w-[35%] h-[40%] bg-[#A855F7]/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[35%] bg-[#7E22CE]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl bg-[#17121F] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative z-10">

        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-[44%] min-h-[700px] relative flex-col p-10 lg:p-12 overflow-hidden">

          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
              alt="EventSphere Event"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-[#0E0B16]/50 via-[#0E0B16]/20 to-[#0E0B16]/95"></div>
          </div>

          <div className="relative z-10">
            <Logo />
          </div>

          <div className="relative z-10 mt-auto">

            <p className="text-[#C084FC] text-xs font-bold tracking-[3px] uppercase mb-4">
              Connect · Discover · Experience
            </p>

            <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white mb-5">
              Start Your Journey
              <span className="block text-[#C084FC]">
                With Us Today.
              </span>
            </h2>

            <p className="text-gray-300 text-sm lg:text-base leading-7 max-w-sm">
              Create an account to exhibit your brand, attend events,
              and connect with professionals.
            </p>

            <div className="w-16 h-1 bg-[#A855F7] mt-7 rounded-full"></div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-[56%] p-6 sm:p-9 lg:p-12 relative">

          {/* BACK TO WEBSITE */}
          <div className="flex justify-end mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#C084FC] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to website
            </Link>
          </div>

          {/* MOBILE LOGO */}
          <div className="md:hidden mb-7 text-center">
            <Logo />
          </div>

          <div className="max-w-md mx-auto">

            <p className="text-[#C084FC] text-xs font-bold tracking-[2px] uppercase mb-3">
              Join EventSphere
            </p>

            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              Create an Account
            </h1>

            <p className="text-gray-400 text-sm mb-8">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#C084FC] font-semibold hover:text-white transition-colors"
              >
                Log in
              </Link>
            </p>

            <form onSubmit={handleSubmit(submit)} className="space-y-5">

              {/* FIRST AND LAST NAME */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name
                  </label>

                  <input
                    {...register('firstName', {
                      required: 'First name is required'
                    })}
                    className={inputStyle}
                    placeholder="First name"
                  />

                  {errors.firstName && (
                    <p className="text-rose-400 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name
                  </label>

                  <input
                    {...register('lastName', {
                      required: 'Last name is required'
                    })}
                    className={inputStyle}
                    placeholder="Last name"
                  />

                  {errors.lastName && (
                    <p className="text-rose-400 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

              </div>

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
                  className={inputStyle}
                  placeholder="Enter your email address"
                />

                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* PHONE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone is required',
                    pattern: {
                      value: /^\+92\d{10}$/,
                      message: 'Format: +92XXXXXXXXXX'
                    }
                  })}
                  className={inputStyle}
                  placeholder="+923001234567"
                />

                {errors.phone && (
                  <p className="text-rose-400 text-xs mt-1">
                    {errors.phone.message}
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
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Minimum 6 characters required'
                      }
                    })}
                    className={`${inputStyle} pr-12`}
                    placeholder="Create a password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C084FC] transition"
                  >
                    {showPassword
                      ? <EyeOff className="w-4 h-4" />
                      : <Eye className="w-4 h-4" />
                    }
                  </button>
                </div>

                {errors.password && (
                  <p className="text-rose-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* ACCOUNT TYPE */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type
                </label>

                <select
                  {...register('role')}
                  className={inputStyle}
                >
                  <option value="attendee">
                    I want to Attend Events
                  </option>
                  <option value="exhibitor">
                    I want to Exhibit (Company)
                  </option>
                </select>
              </div>

              {/* TERMS */}
              <div className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 accent-[#A855F7] flex-shrink-0 cursor-pointer"
                />

                <label className="text-xs text-gray-400 leading-relaxed">
                  I agree to the{' '}
                  <Link
                    to="/terms"
                    className="text-[#C084FC] hover:text-white"
                  >
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link
                    to="/privacy"
                    className="text-[#C084FC] hover:text-white"
                  >
                    Privacy Policy
                  </Link>.
                </label>
              </div>

              {/* REGISTER BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A855F7] hover:bg-[#9333EA] disabled:opacity-60 text-white font-bold py-3.5 px-6 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-900/20"
              >
                <UserPlus className="w-5 h-5" />
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
