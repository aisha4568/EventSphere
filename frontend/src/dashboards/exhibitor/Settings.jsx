
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Shield } from 'lucide-react';

export default function ExhibitorSettings() {
  const { user } = useAuth();

  return (
    <div className="text-white max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      <div className="bg-[#17121F] border border-white/10 p-6 rounded-2xl space-y-6">

        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-900/20">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              {user?.name}
            </h3>
            <p className="text-sm text-purple-400 capitalize">
              {user?.role}
            </p>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Full Name
          </label>

          <input
            readOnly
            value={user?.name || ''}
            className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Email Address
          </label>

          <input
            readOnly
            value={user?.email || ''}
            className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-400" />
            Account Role
          </label>

          <input
            readOnly
            value={user?.role || ''}
            className="w-full bg-[#211A2B] border border-white/10 rounded-xl px-4 py-3 text-gray-300 outline-none capitalize"
          />
        </div>

        <p className="text-xs text-gray-500 italic">
          To update your account details, please contact support.
        </p>
      </div>
    </div>
  );
}
