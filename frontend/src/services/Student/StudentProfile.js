import axios from "axios";
import { getToken } from "../Student/auth";
import { config } from "../config";


export const getStudentProfile = async (studentId) => {
  try {
    const token = getToken();
    const response = await axios.get(
      `${config.serverUrl}/student/profile/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch student profile:", error);
    throw error;
  }
};

export const updateStudentProfile = async (studentId, profileData) => {
  const token = getToken();
  return axios.put(`${config.serverUrl}/profile/${studentId}`, profileData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
