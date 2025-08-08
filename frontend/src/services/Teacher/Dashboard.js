import axios from "axios";
import { config } from "../config";

export async function getTotalStudents(id) {
  try {
    // console.log(id)
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/teacher/dashboard/total-students/${id}`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });

    // console.log(response.data)
    return response.data.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

//  GET TEACHER'S NAME 
export async function getTeacherName(id) {
  try {
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/teacher/dashboard/teacher-name/${id}`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

// GET TEACHER'S ATTENDANCE [USED IN TEACHERNAVBAR ]
export async function getTeacherTotalAttendance(id) {
  try {
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/teacher/dashboard/total-attendance/${id}`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

// GET TEACHER'S COURSES NEW TRY
export async function getTeacherTotalCourses(id) {
  try {
    console.log("GET TECHER TOTAL COUSES" + id);
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/teacher/dashboard/total-courses/${id}`;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });
    // console.log("HAHAHAHHAHAHHAHHAHAHAHAHHA"); THIS ACUTALLY HELPED WITH DEBUG LMAO
    // console.log(await axios.get(url, { headers }));

    // console.log(response.data)
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}



// get all teacher notices
export async function getAllNotices() {
  try {
  
    const token = localStorage.getItem("token");
    const url = `${config.serverUrl}/teacher/dashboard/teacher/latest`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });

    console.log(await axios.get(url, { headers }))
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export function getUserIdFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userId = payload.id;
    console.log(userId);
    return userId || null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
