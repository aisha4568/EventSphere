
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';

export default function AttendeeExhibitors() {
  const [exhibitors, setExhibitors] = useState([]);

  useEffect(() => {
    API.get('/exhibitors?limit=50')
      .then(r => setExhibitors(r.data.data.exhibitors));
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-bold mb-6">Exhibitors Directory</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {exhibitors.map(x => (
          <Link
            key={x._id}
            to={`/exhibitors/${x._id}`}
            className="bg-[#17121F] border border-white/10 p-5 rounded-2xl hover:border-purple-500/50 transition-colors block"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center font-bold text-white mb-3">
              {x.companyName?.[0]?.toUpperCase() || 'E'}
            </div>

            <h3 className="font-semibold truncate text-white">
              {x.companyName}
            </h3>

            <p className="text-xs text-purple-400 mb-2">
              {x.category}
            </p>

            <p className="text-xs text-gray-400 line-clamp-2">
              {x.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
