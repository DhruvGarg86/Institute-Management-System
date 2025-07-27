import axios from "axios";
import { config } from "../config";

export async function getAllTeachers() {
  try {
    let url = `${config.serverUrl}/admin/display-teachers`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getAllTeachersWithAttendance() {
  try {
    let url = `${config.serverUrl}/admin/teacher-attendance`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
