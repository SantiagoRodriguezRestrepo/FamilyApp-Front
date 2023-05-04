import {
    Route,
    BrowserRouter as Router,
    Routes,
} from 'react-router-dom';
import { ROUTES } from '../../constants/Routes';
import { LoginPage } from '../../pages/LoginPage';
export const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            </Routes>
        </Router>
    )
}
