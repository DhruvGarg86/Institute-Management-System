import axios from "axios";
import { config } from "../config";

// Display all teachers
export async function getAllTeachers() {
  try {
    let url = `${config.serverUrl}/admin/display-teachers`;

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

// Display teacher with attendance
export async function getAllTeachersWithAttendance() {
  try {
    let url = `${config.serverUrl}/admin/teacher-attendance`;

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

// Soft Delete Teacher -> makes status INACTIVE
export async function deleteTeacherById(id) {
  try {
    let url = `${config.serverUrl}/admin/delete-teacher/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const responseBody = { status: "INACTIVE" };
    const response = await axios.put(url, responseBody, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function addTeacher(teacher) {
  try {
    const url = `${config.serverUrl}/admin/add-teacher`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, teacher, { headers });

    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}

export async function fetchTeacherById(id) {
  try {
    let url = `${config.serverUrl}/admin/display-teacher/${id}`;

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

export async function submitTeacherById(teacher, id) {
  try {
    const url = `${config.serverUrl}/admin/edit-teacher/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.put(url, teacher, { headers });

    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}
