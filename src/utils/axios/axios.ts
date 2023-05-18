import axios from "axios";

const URL: string = "https://frontend-take-home-service.fetch.com"

const fetchRequest = axios.create({
    withCredentials: true,
    baseURL: URL,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    }
});

export default fetchRequest