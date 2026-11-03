import Home from '../pages/Home.tsx';
import Login from '@/pages/Login.tsx';
import ChoosePlatform from '@/pages/ChoosePlatform.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import { createBrowserRouter } from 'react-router';
import Layout from '@/components/Layout.tsx';

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
                Component: Dashboard,
            },
            {
                path: '/login',
                Component: Login,
            },
            {
                path: '/chooseplatform',
                Component: ChoosePlatform,
            },
        ],
    },
]);
