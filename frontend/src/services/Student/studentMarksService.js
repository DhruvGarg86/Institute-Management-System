// src/api/studentApi.js

import axios from "axios";
import { config } from "../config";

export async function getStudentMarks(studentId) {
  try {
    const token = localStorage.getItem("token");

    const url = `${config.serverUrl}/student/dashboard/marks/${studentId}`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.get(url, { headers });
    return response.data; // Ensure your backend wraps this in a `data` field if needed
  } catch (error) {
    console.error("Error fetching student marks:", error.message);
    throw error;
  }
}

