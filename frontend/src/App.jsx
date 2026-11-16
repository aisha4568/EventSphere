
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Public
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Exhibitors from './pages/Exhibitors';
import ExhibitorProfile from './pages/ExhibitorProfile';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Auth
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Shared
import Notifications from './dashboards/shared/Notifications';

// Admin
import AdminExhibitors from './dashboards/admin/Exhibitors';
import AdminLayout from './dashboards/admin/AdminLayout';
import AdminDashboard from './dashboards/admin/Dashboard';
import ManageEvents from './dashboards/admin/ManageEvents';
import EventForm from './dashboards/admin/EventForm';
import Applications from './dashboards/admin/Applications';
import Booths from './dashboards/admin/Booths';
import Speakers from './dashboards/admin/Speakers';
import Attendees from './dashboards/admin/Attendees';
import Analytics from './dashboards/admin/Analytics';
import FeedbackAdmin from './dashboards/admin/Feedback';
import AdminSettings from './dashboards/admin/Settings';

// Exhibitor
import ExhibitorLayout from './dashboards/exhibitor/ExhibitorLayout';
import ExhibitorDashboard from './dashboards/exhibitor/Dashboard';
import ExhibitorProfileEdit from './dashboards/exhibitor/Profile';
import BrowseExpos from './dashboards/exhibitor/BrowseExpos';
import MyApplications from './dashboards/exhibitor/MyApplications';
import BoothSelection from './dashboards/exhibitor/BoothSelection';
import Messages from './dashboards/exhibitor/Messages';
import ExhibitorSettings from './dashboards/exhibitor/Settings';

// Attendee
import AttendeeLayout from './dashboards/attendee/AttendeeLayout';
import AttendeeDashboard from './dashboards/attendee/Dashboard';
import ExploreEvents from './dashboards/attendee/ExploreEvents';
import MyRegistrations from './dashboards/attendee/MyRegistrations';
import Schedule from './dashboards/attendee/Schedule';
import AttendeeExhibitors from './dashboards/attendee/Exhibitors';
import Bookmarks from './dashboards/attendee/Bookmarks';
import AttendeeFeedback from './dashboards/attendee/Feedback';
import AttendeeProfile from './dashboards/attendee/Profile';

export default function App() {
  const { user } = useAuth();

  return (
    <Routes>

      {/* Public */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/exhibitors" element={<Exhibitors />} />
        <Route path="/exhibitors/:id" element={<ExhibitorProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
      </Route>

      {/* Auth */}
      <Route element={<PublicLayout />}>
        <Route
          path="/login"
          element={user ? <Navigate to={`/${user.role}`} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={`/${user.role}`} /> : <Register />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute roles={['admin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="exhibitors" element={<AdminExhibitors />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="events/new" element={<EventForm />} />
          <Route path="events/:id" element={<EventForm />} />
          <Route path="applications" element={<Applications />} />
          <Route path="booths" element={<Booths />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="attendees" element={<Attendees />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="feedback" element={<FeedbackAdmin />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>

      {/* Exhibitor */}
      <Route element={<ProtectedRoute roles={['exhibitor']} />}>
        <Route path="/exhibitor" element={<ExhibitorLayout />}>
          <Route index element={<ExhibitorDashboard />} />
          <Route path="profile" element={<ExhibitorProfileEdit />} />
          <Route path="expos" element={<BrowseExpos />} />
          <Route path="applications" element={<MyApplications />} />
          <Route path="booths" element={<BoothSelection />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="settings" element={<ExhibitorSettings />} />
        </Route>
      </Route>

      {/* Attendee */}
      <Route element={<ProtectedRoute roles={['attendee']} />}>
        <Route path="/attendee" element={<AttendeeLayout />}>
          <Route index element={<AttendeeDashboard />} />
          <Route path="events" element={<ExploreEvents />} />
          <Route path="registrations" element={<MyRegistrations />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="exhibitors" element={<AttendeeExhibitors />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="messages" element={<Messages />} />
          <Route path="feedback" element={<AttendeeFeedback />} />
          <Route path="profile" element={<AttendeeProfile />} />
        </Route>
      </Route>

      {/* Not Found */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  );
}
