import axios from "axios";
import { config } from "../config";

export async function getAllNotices() {
  try {
    const url = `${config.serverUrl}/student/notice`;

    const token = localStorage.getItem("token");
    const headers = { Authorization: `Bearer ${token}` };
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
