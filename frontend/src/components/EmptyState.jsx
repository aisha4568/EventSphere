import { Inbox } from 'lucide-react';

export default function EmptyState({ title = 'Nothing here yet', message = '', icon: Icon = Inbox, action }) {
  return (
    <div className="card p-10 text-center flex flex-col items-center gap-4">
      <div className="w-20 h-20 rounded-full bg-brand-gradient-soft flex items-center justify-center">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      {message && <p className="text-muted max-w-md">{message}</p>}
      {action}
    </div>
  );
}