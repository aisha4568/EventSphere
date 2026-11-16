import { LayoutDashboard, Calendar, Plus, Building2, ClipboardList, Grid3x3, Users, BarChart3, Bell, MessageSquare, Settings, Mic2 } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/events', label: 'Manage Events', icon: Calendar },
  { to: '/admin/events/new', label: 'Add New Event', icon: Plus },
  { to: '/admin/exhibitors', label: 'Exhibitors', icon: Building2 },
  { to: '/admin/applications', label: 'Applications', icon: ClipboardList },
  { to: '/admin/booths', label: 'Booth Management', icon: Grid3x3 },
  { to: '/admin/speakers', label: 'Speakers', icon: Mic2 },
  { to: '/admin/attendees', label: 'Attendees', icon: Users },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/admin/messages', label: 'Messages', icon: MessageSquare },
  { to: '/admin/notifications', label: 'Notifications', icon: Bell },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  return <DashboardLayout links={links} title="Admin Panel" />;
}