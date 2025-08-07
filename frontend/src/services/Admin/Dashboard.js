import axios from "axios";
import { config } from "../config";

export async function getTotalStudents() {
  try {
    let url = `${config.serverUrl}/admin/dashboard/totalStudents`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });
    
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getTotalTeachers() {
  try {
    let url = `${config.serverUrl}/admin/dashboard/totalTeachers`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getTotalCourses() {
  try {
    let url = `${config.serverUrl}/admin/dashboard/totalCourses`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getAllNotices() {
  try {
    let url = `${config.serverUrl}/admin/dashboard/sendNotice`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getTopStudent() {
  try {
    let url = `${config.serverUrl}/admin/student/instituteTopper`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
