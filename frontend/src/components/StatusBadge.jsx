const variants = {
  pending: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  approved: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  confirmed: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  rejected: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  cancelled: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  available: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  reserved: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  occupied: 'bg-rose-500/15 text-rose-300 border border-rose-500/30',
  registered: 'bg-primary/15 text-primary border border-primary/30',
  open: 'bg-primary/15 text-primary border border-primary/30',
  resolved: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  'in-progress': 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
};

export default function StatusBadge({ status }) {
  return <span className={`badge ${variants[status] || 'bg-white/10 text-muted'}`}>{status}</span>;
}