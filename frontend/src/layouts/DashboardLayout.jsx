
import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  LayoutDashboard,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../services/socket';
import toast from 'react-hot-toast';

export default function DashboardLayout({ links, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handler = (n) => {
      setNotifCount((c) => c + 1);
      toast.success(n.title || 'New notification');
    };

    socket.on('notification:new', handler);
    return () => socket.off('notification:new', handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-[#0E0B16] text-white font-sans">

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/10 bg-[#130F1B] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-white/10 px-6">
          <Logo />

          <button
            onClick={() => setOpen(false)}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-7">

          <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[2px] text-gray-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'border border-purple-500/20 bg-purple-500/15 text-purple-300'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute bottom-2 left-0 top-2 w-[3px] rounded-r-full bg-purple-500" />
                    )}

                    <l.icon
                      className={`h-5 w-5 shrink-0 ${
                        isActive
                          ? 'text-purple-400'
                          : 'text-gray-500 group-hover:text-purple-300'
                      }`}
                    />

                    <span className="flex-1">{l.label}</span>

                    {isActive && (
                      <ChevronRight size={16} className="text-purple-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="mb-4 rounded-xl border border-purple-500/10 bg-purple-500/5 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500/15 text-sm font-bold text-purple-300">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-purple-400">
                  {user?.role || 'Member'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-purple-400 transition hover:bg-purple-500/10 hover:text-purple-300"          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="relative flex min-h-screen min-w-0 flex-1 flex-col">

        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-20 shrink-0 items-center justify-between border-b border-white/10 bg-[#0E0B16]/95 px-4 backdrop-blur-xl md:px-6 lg:px-8">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white lg:hidden"
            >
              <Menu size={23} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-white md:text-xl">
                {title}
              </h1>
              <p className="hidden text-xs text-gray-500 sm:block">
                Welcome back to your workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">

            {/* Search */}
            <div className="group relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition group-focus-within:text-purple-400" />

              <input
                type="text"
                placeholder="Search..."
                className="w-48 rounded-full border border-white/10 bg-[#17121F] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500/50 lg:w-60"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={() => {
                setNotifCount(0);
                navigate(`/${user?.role}/notifications`);
              }}
              className="relative rounded-xl border border-white/10 bg-[#17121F] p-2.5 text-gray-400 transition hover:border-purple-500/30 hover:text-purple-400"
            >
              <Bell size={19} />

              {notifCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-purple-500 px-1 text-[9px] font-bold text-white">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-3 md:pl-5">
              <div className="hidden text-right sm:block">
                <p className="max-w-32 truncate text-sm font-semibold text-white">
                  {user?.name}
                </p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-400">
                  {user?.role}
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-400/40 bg-gradient-to-br from-purple-500 to-purple-800 text-sm font-bold text-white shadow-lg shadow-purple-500/10">
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mx-auto h-full w-full max-w-[1600px]"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

      </div>
    </div>
  );
}