import Home from '../pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/dashboard',
        Component: Dashboard,
      },

      {
        path:"/login",
        Component: Login
      }
    ],
  },
]);
