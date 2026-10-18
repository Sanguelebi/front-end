import a from "axios";


const axios = a.create({
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    },

    baseURL:"http://localhost:8080/api"
});

export default axios;