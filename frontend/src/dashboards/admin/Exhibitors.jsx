
import { useEffect, useState } from 'react';
import { Search, Building2, Mail, Phone } from 'lucide-react';
import API from '../../services/api';
import EmptyState from '../../components/EmptyState';

export default function ExhibitorsAdmin() {
  const [exhibitors, setExhibitors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/exhibitors')
      .then((r) => {
        setExhibitors(r.data.data.exhibitors || []);
      })
      .catch(() => {
        setExhibitors([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredExhibitors = exhibitors.filter((x) =>
    `${x.companyName || ''} ${x.category || ''}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="text-white">

      <div className="mb-8">
        <h2 className="text-2xl font-bold">Manage Exhibitors</h2>
        <p className="text-sm text-gray-400 mt-1">
          View and manage registered exhibiting companies.
        </p>
      </div>

      <div className="bg-[#17121F] border border-white/10 rounded-2xl p-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <p className="text-sm text-gray-400">Total Exhibitors</p>
            <h3 className="text-2xl font-bold mt-1">
              {exhibitors.length}
            </h3>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company..."
              className="w-full bg-[#211A2B] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-purple-500 placeholder:text-gray-500"
            />
          </div>

        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredExhibitors.length === 0 ? (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl p-8">
          <EmptyState
            title="No Exhibitors Found"
            message="No registered companies match your search."
            icon={Building2}
          />
        </div>
      ) : (
        <div className="bg-[#17121F] border border-white/10 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#211A2B] text-gray-400 text-xs uppercase">
                <tr>
                  <th className="px-5 py-4">Company</th>
                  <th className="px-5 py-4">Category</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Phone</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {filteredExhibitors.map((x) => (
                  <tr
                    key={x._id}
                    className="hover:bg-purple-500/5 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3 min-w-[180px]">
                        <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                          {x.companyName?.charAt(0)?.toUpperCase() || 'E'}
                        </div>
                        <span className="font-semibold text-sm">
                          {x.companyName || 'Unnamed Company'}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-300">
                      {x.category || '—'}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-purple-400" />
                        {x.contactInfo?.email || x.email || '—'}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-purple-400" />
                        {x.contactInfo?.phone || x.phone || '—'}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-400">
                        {x.status || 'Registered'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
