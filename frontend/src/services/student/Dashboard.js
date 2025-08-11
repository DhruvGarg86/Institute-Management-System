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