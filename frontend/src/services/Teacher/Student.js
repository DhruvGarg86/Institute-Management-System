import axios from "axios";
import { config } from "../config";

    export function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id;
        console.log("YE DEKH " + userId)
        return userId || null;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
    }


export async function getAllStudents(id) {
  const url = `${config.serverUrl}/teacher/students/${id}`;
  console.log(url)
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(url, { headers });
  console.log(await axios.get(url, { headers }))
  return response.data;
}

