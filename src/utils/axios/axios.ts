import axios from "axios";

export const BASE_URL: string = "https://frontend-take-home-service.fetch.com"

const fetchRequest = axios.create({
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
});

export default fetchRequest