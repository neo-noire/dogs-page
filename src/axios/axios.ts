import axios from "axios";


const fetchRequest = axios.create({
    withCredentials: true,
    baseURL: "https://frontend-take-home-service.fetch.com",
    headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
});

export default fetchRequest