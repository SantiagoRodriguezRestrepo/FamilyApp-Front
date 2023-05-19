import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { LoginPage } from '../../pages/LoginPage';
// import { ProtectedRoute } from './ProtectedRoute';
import { AdminPage } from '../../pages/AdminPage';
import { AuthProvider } from './AuthProvider';
import { UserPage } from '../../pages/UserPage';
export const AppRoutes = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          <Route path={ROUTES.USER} element={<UserPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
