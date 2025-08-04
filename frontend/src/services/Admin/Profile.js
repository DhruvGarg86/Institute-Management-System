import axios from "axios";
import { config } from "../config";

export async function fetchProfile(id) {
    try{
        let url = `${config.serverUrl}/admin/profile/${id}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log("Exception", error.message);
        throw error;
    }
    
}

export async function editProfile(body, id){
    try{
        let url = `${config.serverUrl}/admin/profile-edit/${id}`; 
        const response = await axios.put(url, body);
        return response.data;
    } catch (error) {
        console.log("Exception", error.message);
        throw error;
    }
}

export async function uploadImage(file) {
    let url = `${config.serverUrl}/image/upload`;

    const formData = new FormData();
    formData.append("image", file);

    const response = await axios.post(url, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data;
}