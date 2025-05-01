import { lazy } from 'react';
import MainLayout from '@/layout/MainLayout';
import Loadable from '@/components/ui/loadable';
import { AuthGuard } from '@/utils/routeGuards';

const Dashboard = Loadable(lazy(() => import('@/views/dashboard/Dashboard')));
const Profile = Loadable(lazy(() => import('@/views/profile/Profile')));

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/dashboard/profile',
      element: <Profile />
    }
  ]
};

export default MainRoutes;