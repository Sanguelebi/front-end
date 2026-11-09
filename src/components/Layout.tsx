import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/userSlice';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                dispatch(setUser(JSON.parse(savedUser)));
            } catch (e) {
                console.error('Failed to parse saved user from localStorage:', e);
            }
        }
    }, [dispatch]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
