import axios from "axios";
import { config } from "../config";

export async function getAllComplaint() {
  try {
    let url = `${config.serverUrl}/admin/complaints`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function deleteComplaintById(id) {
  try {
    let url = `${config.serverUrl}/admin/complaints/${id}`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getComplaintById(id) {
  try {
    let url = `${config.serverUrl}/admin/complaints/complaintById/${id}`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function updateComplaint(id, status) {
  try {
    let url = `${config.serverUrl}/admin/complaints/${id}`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.put(url, status, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
