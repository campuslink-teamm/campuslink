import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import MyListingsPage from './pages/MyListingsPage'; // Pridėtas Mano skelbimų puslapio importas
import CreateActivityForm from './components/ui/CreateActivityForm';
import TripsPage from './pages/TripPage';
import ActivityDetail from './components/ui/ActivityDetail';

// Puslapių apsauga
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Vieši puslapiai */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Tik prisijungusiems naudotojams */}
        <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <FeedPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <TripsPage />
            </ProtectedRoute>
          }
        />

        {/* Mano skelbimų puslapis */}
        <Route
          path="/my-listings"
          element={
            <ProtectedRoute>
              <MyListingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateActivityForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/activities/:activityId"
          element={
            <ProtectedRoute>
              <ActivityDetailRoute />
            </ProtectedRoute>
          }
        />
        {/* Naudotojo profilis */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Nežinomas adresas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

function ActivityDetailRoute() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  return (
    <ActivityDetail
      activityId={activityId}
      onBack={() => navigate('/feed')}
    />
  );
}