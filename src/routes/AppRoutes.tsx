import Home from '../pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import ChoosePlatform from '@/pages/ChoosePlatform.tsx';
import CoordinatorRequests from '@/pages/CoordinatorRequests.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout.tsx';
import ProtectedRoute from '@/components/ProtectedRoute.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        // By including the layout here, the children
        // will all have that header and footer.
        Component: Layout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: '/dashboard',
                element: (
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/chooseplatform',
                element: (
                    <ProtectedRoute allowedRoles={['student']}>
                        <ChoosePlatform />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/requests',
                element: (
                    <ProtectedRoute allowedRoles={['coordinator']}>
                        <CoordinatorRequests />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/courses',
                element: (
                    <ProtectedRoute allowedRoles={['manager']}>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '/students',
                element: (
                    <ProtectedRoute allowedRoles={['manager']}>
                        <Dashboard />
                    </ProtectedRoute>
                ),
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);
