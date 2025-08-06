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
    const url = `${config.serverUrl}/admin/student/add-student`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, student, {headers});

    return response.data;
  } catch (error) {
    console.error("Exception", error.message);
    throw error;
  }
}
