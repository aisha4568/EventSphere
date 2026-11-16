
import { Users, Target, Award, Eye, Heart, Building2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-[#0E0B16]min-h-screen text-white">

      <div className="max-w-7xl mx-auto px-4 py-16">

        {/* PAGE HEADING */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[3px] text-[#A855F7] mb-4">
            GET TO KNOW US
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-5">
            About <span className="text-[#A855F7]">EventSphere</span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering Pakistan's professional event ecosystem since 2020.
          </p>
        </div>

        {/* OUR STORY */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-16">

          {/* STORY IMAGE */}
          <div className="relative h-[350px] lg:h-[460px] rounded-3xl overflow-hidden border border-purple-500/20">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200"
              alt="Professional exhibition event"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#100824]/95 via-[#100824]/20 to-transparent" />

            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[#C084FC] text-sm font-semibold tracking-widest mb-2">
                OUR JOURNEY
              </p>

              <h2 className="text-3xl font-bold text-white">
                Bringing Ideas, People & Opportunities Together.
              </h2>
            </div>
          </div>

          {/* STORY CONTENT */}
          <div className="bg-[#17121F] border border-white/10 rounded-3xl p-8 md:p-10 h-[460px] flex flex-col justify-center overflow-hidden">

            <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-6">
              <Building2 className="w-6 h-6 text-[#A855F7]" />
            </div>

            <h2 className="text-3xl font-bold mb-6">
              Our <span className="text-[#A855F7]">Story</span>
            </h2>

            <p className="text-gray-400 leading-8 mb-5">
              EventSphere was born from a simple observation: Pakistan's
              world-class exhibitions and conferences deserved world-class
              digital infrastructure. We set out to build a platform that
              connects exhibitors, organizers and attendees seamlessly.
            </p>

            <p className="text-gray-400 leading-8">
              Today, we power expos across Karachi, Lahore, Islamabad,
              Faisalabad and beyond — helping companies reach visitors
              through our suite of booth management, registration and
              networking tools.
            </p>
          </div>

        </div>

        {/* STATISTICS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">

          {[
            { n: '100+', l: 'Events Hosted', icon: Target },
            { n: '500+', l: 'Partner Companies', icon: Users },
            { n: '50K+', l: 'Attendees', icon: Award }
          ].map((s) => (
            <div
              key={s.l}
              className="bg-[#121212] border border-white/10 rounded-2xl p-8 text-center hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mx-auto mb-5">
                <s.icon className="w-7 h-7 text-[#A855F7]" />
              </div>

              <p className="text-4xl font-extrabold text-white mb-2">
                {s.n}
              </p>

              <p className="text-gray-400">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        {/* MISSION & VISION */}
        <div className="mb-10 text-center">
          <p className="text-sm font-semibold tracking-[3px] text-[#A855F7] mb-3">
            WHAT DRIVES US
          </p>

          <h2 className="text-3xl md:text-4xl font-bold">
            Our Mission & Vision
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* MISSION */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-5">
              <Heart className="w-6 h-6 text-[#A855F7]" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Our Mission
            </h3>

            <p className="text-gray-400 leading-7">
              To make event planning and participation easier by connecting
              organizers, exhibitors and attendees through one reliable
              digital platform.
            </p>
          </div>

          {/* VISION */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-8 hover:border-purple-500/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-[#A855F7]" />
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Our Vision
            </h3>

            <p className="text-gray-400 leading-7">
              To become a trusted platform for exhibitions and professional
              events across Pakistan, creating meaningful connections and
              opportunities.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
