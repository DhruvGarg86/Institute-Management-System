import axios from "axios";
import { config } from "../config";

export async function fetchProfile(id) {
  try {
    let url = `${config.serverUrl}/teacher/profile/${id}`;

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


export async function editProfile(body, id) {
  try {
    let url = `${config.serverUrl}/teacher/profile/edit/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(url, body, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function uploadImage(file) {
  const token = localStorage.getItem("token");
  const url = `${config.serverUrl}/image/upload`;

  const formData = new FormData();
  formData.append("image", file);

  const headers = {
    Authorization: `Bearer ${token}`, 
    "Content-Type": "multipart/form-data",
  };

  const response = await axios.post(url, formData, { headers });
  return response.data;
}

export function getAdminIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const adminId = payload.id;
    return adminId || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
