import axios from "axios";
import { config } from "../config";
export async function getStudentProfile(id) {
  try {
    let url = `${config.serverUrl}/student/profile/${id}`;

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

export async function getStudentAttendance(id) {
  try {
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/student/attendance/${id}`;
    const headers = { Authorization: `Bearer ${token}` };

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.log("Error fetching student attendance:", error.message);
    throw error;
  }
}

export function getUserIdFromToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the payload
    return payload.userId;
  } catch (error) {
    console.error("Failed to parse JWT token", error);
    return null;
  }
}

export async function getAllFees() {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Token not found");

    const payload = JSON.parse(atob(token.split(".")[1]));
    const studentId = payload.userId || payload.id || payload.sub;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(
      `${config.serverUrl}/student/fee/${studentId}`,
      {
        headers,
      }
    );

    return response.data; // Ensure this returns a list of fee DTOs
  } catch (error) {
    console.error("Failed to fetch fee details", error);
    throw error;
  }
}
