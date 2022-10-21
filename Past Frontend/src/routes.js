import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import DashboardApp from './pages/DashboardPage';
import About from './pages/AboutPage';
import AnswerCallsPage from './pages/AnswerCallsPage';
import PredictionPage from './pages/PredictionPage';
import CustomersListPage from './pages/CustomersListPage';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        // { path: 'customers', element: <CustomersListPage /> },
        { path: 'answerCalls', element: <AnswerCallsPage /> },
        { path: 'predictCall', element: <PredictionPage /> },
        { path: 'about', element: <About /> }
      ]
    },
    {
      path: '/',
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
      ]
    }
  ]);
}
