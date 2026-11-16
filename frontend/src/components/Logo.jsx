
import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';

export default function Logo({ to = '/' }) {
  return (
    <Link to={to} className="flex items-center gap-3 group">

      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#6D28D9] flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
        <Hexagon
          className="w-7 h-7 text-white"
          strokeWidth={2.5}
        />
      </div>

      <span className="text-2xl font-black tracking-tight text-white">
        Event
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#9333EA]">
          Sphere
        </span>
      </span>

    </Link>
  );
}
