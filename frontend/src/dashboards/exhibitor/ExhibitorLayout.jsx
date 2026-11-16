import { LayoutDashboard, Building2, Calendar, ClipboardList, Grid3x3, MessageSquare, Bell, Settings } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const links = [
  { to: '/exhibitor', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/exhibitor/profile', label: 'Company Profile', icon: Building2 },
  { to: '/exhibitor/expos', label: 'Browse Expos', icon: Calendar },
  { to: '/exhibitor/applications', label: 'My Applications', icon: ClipboardList },
  { to: '/exhibitor/booths', label: 'Booth Selection', icon: Grid3x3 },
  { to: '/exhibitor/messages', label: 'Messages', icon: MessageSquare },
  { to: '/exhibitor/notifications', label: 'Notifications', icon: Bell },
  { to: '/exhibitor/settings', label: 'Settings', icon: Settings },
];

export default function ExhibitorLayout() {
  return <DashboardLayout links={links} title="Exhibitor Panel" />;
}