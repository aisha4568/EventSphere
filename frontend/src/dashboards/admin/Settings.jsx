
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield, Settings } from 'lucide-react';

export default function AdminSettings() {
  const { user } = useAuth();

  return (
    <div className="text-white max-w-3xl">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">Account Settings</h2>
        <p className="text-gray-400 text-sm mt-1">
          View your account information and administrator details.
        </p>
      </div>

      <div className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden">

        {/* Profile Header */}
        <div className="p-6 sm:p-8 border-b border-white/10">
          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-2xl font-bold text-purple-400">
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">
                {user?.name || 'Administrator'}
              </h3>

              <p className="text-sm text-purple-400 capitalize mt-1">
                {user?.role || 'Admin'}
              </p>
            </div>

          </div>
        </div>

        {/* Account Information */}
        <div className="p-6 sm:p-8 space-y-6">

          <div className="flex items-center gap-2 mb-2">
            <Settings className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">
              Personal Information
            </h3>
          </div>

          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-purple-400" />
              Full Name
            </label>

            <input
              readOnly
              value={user?.name || ''}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-purple-400" />
              Email Address
            </label>

            <input
              readOnly
              value={user?.email || ''}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Account Role
            </label>

            <input
              readOnly
              value={user?.role || ''}
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 capitalize outline-none cursor-not-allowed"
            />
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-6">
              To update your account details, please contact support.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
