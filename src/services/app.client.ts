import a from 'axios';


const axios = a.create({
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },

    baseURL: import.meta.env.VITE_BACKEND_API_URL as string,
});

export default axios;
