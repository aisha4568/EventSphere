
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react';
import API from '../services/api';
import PageLoader from '../components/PageLoader';

export default function ExhibitorProfile() {
  const { id } = useParams();
  const [ex, setEx] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/exhibitors/${id}`)
      .then((r) => setEx(r.data.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLoader />;

  if (!ex) {
    return (
      <div className="text-center py-20 text-white min-h-screen bg-[#0E0B16]">
        Exhibitor not found
      </div>
    );
  }

  return (
    <div className="bg-[#0E0B16] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* Company Profile */}
        <div className="bg-[#17121F] border border-white/10 rounded-3xl p-8 md:p-12 mb-6">

          <div className="flex flex-col md:flex-row gap-6 items-start">

            <div className="w-24 h-24 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 flex-shrink-0">
              <Building2 className="w-12 h-12" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-extrabold mb-3 text-white">
                {ex.companyName}
              </h1>

              <span className="inline-block px-4 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-sm font-medium">
                {ex.category}
              </span>

              <p className="text-gray-400 mt-5 leading-7">
                {ex.description}
              </p>
            </div>

          </div>
        </div>

        {/* Company Details */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Contact */}
          <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">

            <h3 className="font-bold text-lg mb-6 text-white">
              Contact Information
            </h3>

            <ul className="space-y-5 text-sm">

              {ex.email && (
                <li className="flex items-center gap-3 text-gray-400 break-all">
                  <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  {ex.email}
                </li>
              )}

              {ex.phone && (
                <li className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  {ex.phone}
                </li>
              )}

              {ex.website && (
                <li className="flex items-center gap-3 text-gray-400 break-all">
                  <Globe className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  {ex.website}
                </li>
              )}

              {ex.address && (
                <li className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  {ex.address}
                </li>
              )}

              {!ex.email && !ex.phone && !ex.website && !ex.address && (
                <p className="text-gray-500">
                  No contact information available.
                </p>
              )}

            </ul>
          </div>

          {/* Products & Services */}
          {ex.products?.length > 0 && (
            <div className="bg-[#17121F] border border-white/10 rounded-2xl p-6">

              <h3 className="font-bold text-lg mb-6 text-white">
                Products & Services
              </h3>

              <div className="flex flex-wrap gap-3">
                {ex.products.map((p, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300"
                  >
                    {p}
                  </span>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
