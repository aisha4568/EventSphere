
import { FileText, ShieldCheck, CreditCard, Users, CalendarCheck } from 'lucide-react';

export default function Terms() {
  return (
    <div className="min-h-screen bg-[#0E0B16] text-white px-4 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-purple-500/10 flex items-center justify-center">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>

          <p className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-3">
            EventSphere Policies
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Terms & <span className="text-purple-400">Conditions</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto leading-7">
            Please read these terms carefully before using EventSphere
            and participating in events through our platform.
          </p>
        </div>

        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6 md:p-10 space-y-8">

          <p className="text-gray-400 leading-7">
            By accessing or using EventSphere, you agree to follow
            the terms and conditions described on this page.
            These guidelines help maintain a safe and professional
            event community.
          </p>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                01. User Responsibilities
              </h2>
            </div>
            <p className="text-gray-400 leading-7">
              Users must provide accurate and up-to-date information
              when creating an account or registering for an event.
              Any misuse of the platform or disrespectful behavior
              towards other members is not permitted.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <CalendarCheck className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                02. Event Registration
              </h2>
            </div>
            <p className="text-gray-400 leading-7">
              Event registrations are subject to availability and
              the requirements specified by the event organizer.
              Users should review event details carefully before
              completing their registration.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                03. Payments & Refunds
              </h2>
            </div>
            <p className="text-gray-400 leading-7">
              Event registration fees are non-refundable unless
              the event is cancelled or the organizer announces
              a different refund policy. Any applicable payment
              conditions will be shared with users.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">
                04. Account Security
              </h2>
            </div>
            <p className="text-gray-400 leading-7">
              Users are responsible for keeping their login
              credentials secure and must not share their account
              access with unauthorized individuals.
            </p>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-gray-500 text-sm leading-6">
              By continuing to use EventSphere, you acknowledge
              that you have read and agreed to these terms.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
