import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/AppRoutes';

function App() {
    if (import.meta.env.development) {
        console.log('DEV');
    } else if (import.meta.env.production) {
        console.log('PROD');
    }
    console.log(import.meta.env.VITE_BACKEND_API_URL);
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
