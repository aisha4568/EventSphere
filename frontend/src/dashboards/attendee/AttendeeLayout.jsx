import { LayoutDashboard, Compass, Ticket, Calendar, Users, Bookmark, Bell, MessageSquare, User } from 'lucide-react';
import DashboardLayout from '../../layouts/DashboardLayout';

const links = [
  { to: '/attendee', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/attendee/events', label: 'Explore Events', icon: Compass },
  { to: '/attendee/registrations', label: 'My Registrations', icon: Ticket },
  { to: '/attendee/schedule', label: 'Event Schedule', icon: Calendar },
  { to: '/attendee/exhibitors', label: 'Exhibitors', icon: Users },
  { to: '/attendee/bookmarks', label: 'Bookmarked Sessions', icon: Bookmark },
  { to: '/attendee/notifications', label: 'Notifications', icon: Bell },
  { to: '/attendee/messages', label: 'Messages', icon: MessageSquare },
  { to: '/attendee/feedback', label: 'Feedback', icon: MessageSquare },
  { to: '/attendee/profile', label: 'Profile', icon: User },
];

export default function AttendeeLayout() {
  return <DashboardLayout links={links} title="Attendee Panel" />;
}