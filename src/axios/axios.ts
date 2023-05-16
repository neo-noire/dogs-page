import axios from "axios";


const fetchRequest = axios.create({
    withCredentials: true,
    baseURL: "https://frontend-take-home-service.fetch.com",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
});

export default fetchRequest