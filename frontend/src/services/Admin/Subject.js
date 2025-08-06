import axios from "axios";
import { config } from "../config";

export async function addSubject(subject) {
  try {
    const url = `${config.serverUrl}/admin/add-subject`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, subject, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getAllSubjects() {
  try {
    let url = `${config.serverUrl}/admin/display-subject`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function deleteSubjectById(id) {
  try {
    let url = `${config.serverUrl}/admin/delete-subject/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getSubjectById(id) {
  try {
    let url = `${config.serverUrl}/admin/get-subject/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function updateSubject(id, subject) {
    try{
        const url = `${config.serverUrl}/admin/edit-subject/${id}`

        const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };
        const response = await axios.put(url, subject, { headers });
        return response.data;
    }catch(error){
        console.log("Exception", error.message);
        throw error;    
    }
    
}
