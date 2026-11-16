
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Search, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/exhibitors', label: 'Exhibitors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function PublicLayout() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#100824] text-white font-sans selection:bg-[#A855F7] selection:text-white">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-[#160B2E]/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-950/30">

        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-12">
            <Logo />

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#C084FC]'
                        : 'text-gray-300 hover:text-[#C084FC]'
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-5">

            <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500/20 transition border border-purple-400/20">
              <Search className="w-4 h-4 text-gray-300" />
            </button>

            {user ? (
              <Link
                to={`/${user.role}`}
                className="bg-gradient-to-r from-[#9333EA] to-[#7C3AED] text-white px-7 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-5">

                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white text-sm font-medium transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-gradient-to-r from-[#9333EA] to-[#7C3AED] text-white px-7 py-3 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Register
                </Link>

              </div>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-white"
          >
            {open ? <X /> : <Menu />}
          </button>

        </nav>

        {open && (
          <div className="lg:hidden border-t border-purple-500/20 bg-[#160B2E] p-5 space-y-4">

            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-gray-300 hover:text-purple-400"
              >
                {l.label}
              </NavLink>
            ))}

            {user ? (
              <Link
                to={`/${user.role}`}
                className="bg-purple-600 text-white w-full py-3 text-center block rounded-full text-sm font-semibold"
              >
                Dashboard
              </Link>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  className="flex-1 text-center py-3 border border-purple-400/40 text-white rounded-full text-sm"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="flex-1 text-center py-3 bg-purple-600 text-white font-semibold rounded-full text-sm"
                >
                  Register
                </Link>
              </div>
            )}

          </div>
        )}

      </header>

      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[#160B2E] pt-16 pb-8 border-t border-purple-500/20 relative overflow-hidden">

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-4 gap-12 mb-12">

          <div>
            <Logo />

            <p className="text-white text-sm mt-6 mb-6 leading-relaxed">
              EventSphere is your platform to discover events, connect with exhibitors and explore extraordinary experiences.
            </p>

            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors border border-purple-400/20"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>

            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
              <li><Link to="/events" className="hover:text-purple-400 transition">Events</Link></li>
              <li><Link to="/exhibitors" className="hover:text-purple-400 transition">Exhibitors</Link></li>
              <li><Link to="/about" className="hover:text-purple-400 transition">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Support</h4>

            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link to="/login" className="hover:text-purple-400 transition">Login</Link></li>
              <li><Link to="/register" className="hover:text-purple-400 transition">Register</Link></li>
              <li><Link to="/contact" className="hover:text-purple-400 transition">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-purple-400 transition">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>

            <p className="text-sm text-gray-400 mb-5">
              Get the latest event updates directly in your inbox.
            </p>

            <div className="flex bg-white/5 rounded-xl p-1 border border-purple-400/20">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent text-sm text-white px-4 py-3 w-full focus:outline-none placeholder-gray-500"
              />

              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} EventSphere. All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}
