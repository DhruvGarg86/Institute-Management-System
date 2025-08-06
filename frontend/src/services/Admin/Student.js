import axios from "axios";
import { config } from "../config";

export async function getAllStudents() {
  const url = `${config.serverUrl}/admin/student/studentDetails`;

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const response = await axios.get(url, { headers });
  return response.data;
}

export async function addStudent(student) {
  try {
    const url = `${config.serverUrl}/admin/student/addStudent`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, student, { headers });

    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}

export async function getCoursesList() {
  try {
    const url = `${config.serverUrl}/admin/display-course`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}

export async function deleteStudentById(id) {
  try {
    const url = `${config.serverUrl}/admin/student/deleteStudent/${id}`;

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

export async function getStudentById(id) {
  try {
    const url = `${config.serverUrl}/admin/student/studentDetails/${id}`;

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

export async function updateStudentById(student, id) {
  try {
    const url = `${config.serverUrl}/admin/student/updateStudent/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.put(url, student, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
export async function getStudentAttendance() {
  try {
    const url = `${config.serverUrl}/admin/student/allActiveStudents`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}

export async function getAllFees() {
  try {
    const url = `${config.serverUrl}/admin/student/allStudentsFeeDetails`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}
