import axios  from 'axios';
import { config } from './config';

export async function getLogin(name, password) {
    try {
        const body = {
            "email": name,
            "password": password
        }
        let url = `${config.serverUrl}/auth/login`;
        const response = await axios.post(url, body);
        return response;
    } catch (error) {
        console.log("Exception", error.message);
        throw error;
    }
    
}