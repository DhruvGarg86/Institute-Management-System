import axios from "axios";
import { config } from "../config";

export async function addCourse(course) {
  try {
    const url = `${config.serverUrl}/admin/add-course`;

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

export async function getAllCourses() {
  try {
    const url = `${config.serverUrl}/admin/display-course`;

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

export async function getAllSubjectsByCourseId(id) {
  try {
    const url = `${config.serverUrl}/admin/getSubjectId/${id}`;

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

export async function getAllSubjects() {
  try {
    let url = `${config.serverUrl}/admin/display-subject`;

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

export async function getAllTeachers() {
  try {
    let url = `${config.serverUrl}/admin/display-teachers`;

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

export async function deleteCourseById(id) {
  try {
    let url = `${config.serverUrl}/admin/delete-course/${id}`;

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.delete(url, { headers });
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function getCourseById(id) {
  try {
    let url = `${config.serverUrl}/admin/display-course/${id}`;

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

export const updateCourseById = async (courseId, payload, headers = {}) => {
  const token = localStorage.getItem("token");
  return axios.put(
    `${config.serverUrl}/admin/edit-course/${courseId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...headers,
      },
    }
  );
};

