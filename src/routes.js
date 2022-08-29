import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import User from './pages/User';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Edit from './pages/Edit';
import UserDetails from './pages/UserDetails';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'user', element: <User /> },
      ],
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: 'edit/:id',
      element: <Edit />,
    },
    {
      path: '/dashboard/user/:id',
      element: <UserDetails/>
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/user" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
