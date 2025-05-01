import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MinimalLayout from '@/layout/MinimalLayout';
import Loadable from '@/components/ui/loadable';
import { GuestGuard } from '@/utils/routeGuards';

const Login = Loadable(lazy(() => import('@/views/authentication/auth-forms/AuthLogin')));
const Register = Loadable(lazy(() => import('@/views/authentication/auth-forms/AuthRegister')));

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: 'login',
      element: (
        <GuestGuard>
          <Login />
        </GuestGuard>
      )
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <Register />
        </GuestGuard>
      )
    }
  ]
};

export default AuthenticationRoutes;