
import { ShieldCheck, User, Database, Lock, Eye } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#0E0B16] text-white px-4 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-purple-400" />
          </div>

          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Your Privacy Matters
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Privacy <span className="text-purple-400">Policy</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            Learn how EventSphere collects, uses and protects
            your personal information when you use our platform.
          </p>
        </div>

        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6 md:p-10 space-y-8">

          <p className="text-gray-400 leading-7">
            EventSphere respects your privacy. We collect only
            the information necessary to provide event management
            and participation services through our platform.
          </p>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Database className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                01. Information We Collect
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              We may collect your name, email address, phone number,
              account details and event participation information
              when you register or use EventSphere.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Eye className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                02. How We Use Your Information
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              Your information is used to manage your account,
              process event registrations, communicate important
              updates and improve our platform services.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                03. Data Protection
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              We take reasonable measures to protect your personal
              information from unauthorized access, misuse or disclosure.
              We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                04. Your Privacy Rights
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              You can request access to or deletion of your account
              information by contacting our support team at:
            </p>

            <a
              href="mailto:info@eventsphere.pk"
              className="inline-block mt-3 text-purple-400 hover:text-purple-300 transition-colors"
            >
              info@eventsphere.pk
            </a>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-500 text-sm leading-6">
              By using EventSphere, you acknowledge that you have
              read and understood this Privacy Policy.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
