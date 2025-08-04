import axios from "axios";
import { config } from "../config";

export async function getTotalStudents() {
    try{
        let url = `${config.serverUrl}/admin/dashboard/totalStudents`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;
    }
    
}

export async function getTotalTeachers() {
    try{
        let url = `${config.serverUrl}/admin/dashboard/totalTeachers`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;
    }
    
}

export async function getTotalCourses() {
    try{
        let url = `${config.serverUrl}/admin/dashboard/totalCourses`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;
    }   
}

export async function getAllNotices() {
    try{
        let url =`${config.serverUrl}/admin/dashboard/sendNotice`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;
    }
    
}

export async function getTopStudent() {
    try{
        let url =`${config.serverUrl}/admin/dashboard/topper`;
        const response = await axios.get(url);
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;
    }
    
}