import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
    return (
        <>
            <Header />
            {/*This allows us to insert content in between header and footer*/}
            {/*It serves the same purpose as "children" in React.*/}
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
