import axios from "axios";
import { getToken } from "../Student/auth";
import { config } from "../config";

const API_BASE_URL = "http://localhost:8080/api/student"; // adjust if needed

export const getStudentProfile = async (studentId) => {
  const token = getToken();
  return axios.get(`${config.serverUrl}/profile/${studentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudentProfile = async (studentId, profileData) => {
  const token = getToken();
  return axios.put(`${config.serverUrl}/profile/${studentId}`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
