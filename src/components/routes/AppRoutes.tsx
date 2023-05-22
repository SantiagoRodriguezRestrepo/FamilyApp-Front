import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { LoginPage } from '../../pages/LoginPage';
import { AdminPage } from '../../pages/AdminPage';
import { AuthProvider } from './AuthProvider';
import { UserPage } from '../../pages/UserPage';
import { VisualizadorPage } from '../../pages/VisualizadorPage';
import { useState } from 'react';
export const AppRoutes = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path={ROUTES.LOGIN}
            element={
              <LoginPage
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            }
          />
          <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          <Route path={ROUTES.USER} element={<UserPage />} />
          <Route
            path={ROUTES.VISUALIZADOR}
            element={<VisualizadorPage idRecluse={searchQuery} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};
