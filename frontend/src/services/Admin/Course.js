import axios from "axios";
import { config } from "../config";

export async function addCourse(course) {
  try {
    const url = `${config.serverUrl}/admin/course/addCourse`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(url, course, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
