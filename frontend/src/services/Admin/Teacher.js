import axios from "axios";
import { config } from "../config";

// Display all teachers
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

// Display teacher with attendance
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

// Soft Delete Teacher -> makes status INACTIVE
export async function deleteTeacherById(id) {
  try{
    let url = `${config.serverUrl}/admin/delete-teacher/${id}`;
    const responseBody = {status: "INACTIVE"};
    const response = await axios.put(url, responseBody);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
