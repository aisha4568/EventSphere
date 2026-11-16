
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heroBanner from '../assets/hero-banner.png';
import { motion } from 'framer-motion';
import {
  Calendar, MapPin, ArrowRight, Users, Building2, Globe,
  ShieldCheck, BarChart3, Headphones, Zap, Rocket, Star, Award
} from 'lucide-react';
import API from '../services/api';
import SkeletonCard from '../components/SkeletonCard';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/events?limit=3')
      .then((res) => setEvents(res.data.data.events))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white overflow-hidden font-sans">

      {/* 1. HERO SECTION */}
      <section
        className="relative min-h-[720px] flex items-center overflow-hidden bg-[#100824]"
        style={{
          backgroundImage: `url("${heroBanner}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#100824]/85 via-[#100824]/45 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#100824] via-transparent to-[#100824]/30"></div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 pb-10">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-left"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-sm mb-7">
              <Star className="w-4 h-4 fill-purple-400" />
              The Ultimate Event Management Platform
            </span>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.1] mb-6 text-white">
              Event
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D8A5FF] to-[#9333EA]">
                Sphere
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-2">
              Manage <span className="text-purple-400">•</span> Attend
              <span className="text-purple-400"> • </span> Network
            </h2>

            <p className="text-gray-200 text-lg md:text-xl leading-8 mb-10 max-w-xl">
              Discover the biggest expos, connect with industry leaders
              and explore new opportunities.
            </p>

            <div className="flex flex-wrap gap-5 mt-2">
              <Link
                to="/events"
                className="bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white px-9 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/40 hover:shadow-purple-500/70 transition-all"
              >
                Explore Events
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/register"
                className="border border-purple-400 text-white px-8 py-4 rounded-full font-semibold hover:bg-purple-600/20 transition-all"
              >
                Become an Exhibitor
              </Link>
            </div>
          </motion.div>

          {/* STATISTICS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-5xl mx-auto border-t border-purple-300/30 pt-10">
            {[
              { icon: Calendar, number: '100+', label: 'Events Hosted' },
              { icon: Users, number: '50K+', label: 'Attendees' },
              { icon: Building2, number: '1K+', label: 'Exhibitors' },
              { icon: Globe, number: '20+', label: 'Countries' },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">
                    {stat.number}
                  </h3>
                  <p className="text-gray-300 text-xs md:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. FEATURES */}
      <section className="w-full px-4 md:px-8 py-20 bg-white">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">
            Why Choose <span className="text-[#7E22CE]">EventSphere?</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A complete event management solution for organizers, exhibitors and attendees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Rocket, title: 'Easy Registration', desc: 'Join events in minutes with our streamlined process.' },
            { icon: Zap, title: 'Real-Time Updates', desc: 'Get live event info, schedule changes and notifications.' },
            { icon: ShieldCheck, title: 'Secure & Reliable', desc: 'Your data is always safe with enterprise-grade security.' },
            { icon: BarChart3, title: 'Powerful Analytics', desc: 'Track performance with detailed dashboards and reports.' },
            { icon: Headphones, title: '24/7 Support', desc: 'We are always here to help you with any issues.' },
            { icon: Award, title: 'Premium Quality', desc: 'Experience the best events Pakistan has to offer.' },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-gray-50 border border-purple-100 rounded-2xl p-7 flex flex-col items-start hover:border-purple-400 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7E22CE] to-[#4C1D95] flex items-center justify-center mb-5 shadow-lg shadow-purple-200">
                <f.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="font-bold text-lg text-[#202020] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 leading-6">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    
{/* 3. UPCOMING EVENTS */}
<section className="w-full px-4 md:px-8 pt-8 pb-16 bg-white">

  <div className="flex justify-between items-center mb-10">
    <div>
      <h2 className="text-4xl font-extrabold text-[#202020] flex items-center gap-3">
        <Calendar className="w-9 h-9 text-[#7E22CE]" />
        Upcoming Events
      </h2>
      <p className="text-gray-600 mt-2 text-base">
        Explore our latest expos and conferences.
      </p>
    </div>

    <Link
      to="/events"
      className="hidden md:flex items-center gap-2 text-[#7E22CE] font-semibold border border-[#7E22CE] rounded-lg px-4 py-2 hover:bg-[#7E22CE] hover:text-white transition-all"
    >
      View All <ArrowRight className="w-4 h-4" />
    </Link>
  </div>

  {loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {events.map((ev) => (
        <motion.div
          key={ev._id}
          whileHover={{ y: -8 }}
          className="w-full bg-white rounded-3xl overflow-hidden border-2 border-purple-200 group shadow-md hover:shadow-xl hover:border-purple-400 transition-all duration-300"
        >
          <div className="relative h-56 overflow-hidden">
            <img
              src={ev.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
              alt={ev.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800';
              }}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

            <div className="absolute top-4 right-4 bg-purple-700 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
              {ev.category}
            </div>

            <div className="absolute top-3 left-3 bg-[#7E22CE] text-white rounded-md px-1.5 py-0.5 text-center shadow-md font-bold">
              <p className="text-[9px] uppercase leading-tight">
                {new Date(ev.startDate).toLocaleString('default', { month: 'short' })}
              </p>
              <p className="text-sm leading-tight">
                {new Date(ev.startDate).getDate()}
              </p>
            </div>
          </div>

          <div className="p-5 relative">
            <h3 className="text-xl font-bold text-[#202020] mb-2 line-clamp-1">
              {ev.title}
            </h3>

            <div className="space-y-1 mb-3">
              <p className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-[#7E22CE]" />
                {ev.venue}, {ev.city}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-purple-100 pt-3">
              <Link
                to={`/events/${ev._id}`}
                className="text-sm font-bold text-[#581C87] hover:text-[#7E22CE] transition-all"
              >
                View Details
              </Link>

              <Link
                to={`/events/${ev._id}`}
                className="w-9 h-9 rounded-full bg-[#7E22CE] text-white flex items-center justify-center hover:bg-[#581C87] transition-all"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}

    </div>
  )}
</section>


     
{/* 4. TESTIMONIALS */}
<section className="w-full bg-[#F5F0FA] px-4 md:px-8 pt-14 pb-5">
  <div className="max-w-7xl mx-auto">

    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#241044] mb-3">
        What Our Users Say
      </h2>
      <p className="text-gray-600">
        Trusted by industry leaders and event enthusiasts worldwide.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-6">

      {[
        {
          name: 'Sarah Khan',
          role: 'Event Organizer',
          text: 'EventSphere made our expo experience seamless and highly productive.',
          img: 'https://i.pravatar.cc/150?img=47'
        },
        {
          name: 'Ali Raza',
          role: 'Exhibitor',
          text: 'An amazing platform for networking and business growth.',
          img: 'https://i.pravatar.cc/150?img=12'
        },
        {
          name: 'Ayesha Malik',
          role: 'Attendee',
          text: 'Easy to use, feature-rich and truly professional!',
          img: 'https://i.pravatar.cc/150?img=5'
        }
      ].map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -5 }}
          className="bg-white rounded-2xl p-6 flex items-center gap-4 border border-purple-100 shadow-md hover:shadow-xl transition-all"
        >
          <img
            src={t.img}
            alt={t.name}
            className="w-20 h-20 min-w-20 rounded-full object-cover border-2 border-purple-200 shadow-sm"
          />

          <div className="flex-1">
            <div className="text-[#7E22CE] text-3xl font-bold leading-none mb-2">
              “
            </div>

            <p className="text-gray-700 text-sm leading-6 mb-3">
              "{t.text}"
            </p>

            <h3 className="text-sm font-bold text-[#241044]">
              {t.name}
            </h3>

            <p className="text-xs text-gray-500 mb-2">
              {t.role}
            </p>

            <div className="flex gap-1 text-[#7E22CE]">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 fill-[#7E22CE]" />
              ))}
            </div>
          </div>
        </motion.div>
      ))}

    </div>
  </div>
</section>


      
{/* 5. CTA SECTION */}
<section className="w-full bg-[#F5F0FA] px-4 py-12">

  <div
    className="relative overflow-hidden rounded-2xl border border-purple-500/30 bg-[#16082F] px-8 py-10 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8"
    style={{
      backgroundImage: "linear-gradient(90deg, #16082F 10%, rgba(35, 8, 75, 0.85) 55%, rgba(35, 8, 75, 0.65)), url('https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1400')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}
  >

    {/* ROCKET ICON */}
    <div className="relative z-10 flex-shrink-0">
      <Rocket className="w-16 h-16 text-[#C084FC] drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
    </div>

    {/* CTA TEXT */}
    <div className="relative z-10 text-center md:text-left flex-1">
      <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
        Ready to Create or Join an Amazing Event?
      </h2>

      <p className="text-gray-200 text-sm md:text-base">
        Be part of a global community of innovators, exhibitors and attendees.
      </p>
    </div>

    {/* BUTTON */}
    <div className="relative z-10 flex-shrink-0">
      <Link
        to="/register"
        className="bg-gradient-to-r from-[#9333EA] to-[#6D28D9] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 shadow-lg shadow-purple-600/40 hover:shadow-purple-500/70 hover:scale-105 transition-all duration-300"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </Link>
    </div>

  </div>
</section>


    </div>
  );
}
