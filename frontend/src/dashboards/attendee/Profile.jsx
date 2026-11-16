
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone } from 'lucide-react';

export default function AttendeeProfile() {
  const { user } = useAuth();

  return (
    <div className="text-white max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <div className="bg-[#17121F] border border-white/10 p-6 rounded-2xl space-y-6">

        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/20">
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
          <label className="label text-gray-400 flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            Full Name
          </label>
          <input
            readOnly
            value={user?.name || ''}
            className="input bg-[#211A2B] border-white/10 text-gray-300"
          />
        </div>

        <div>
          <label className="label text-gray-400 flex items-center gap-2">
            <Mail className="w-4 h-4 text-purple-400" />
            Email Address
          </label>
          <input
            readOnly
            value={user?.email || ''}
            className="input bg-[#211A2B] border-white/10 text-gray-300"
          />
        </div>

        <div>
          <label className="label text-gray-400 flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-400" />
            Phone Number
          </label>
          <input
            readOnly
            value={user?.phone || '—'}
            className="input bg-[#211A2B] border-white/10 text-gray-300"
          />
        </div>

        <p className="text-xs text-gray-500 italic">
          To update your account details, please contact support.
        </p>
      </div>
    </div>
  );
}
