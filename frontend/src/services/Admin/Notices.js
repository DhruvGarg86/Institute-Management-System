import axios from "axios";
import { config } from "./../config";

export async function getAllNotices() {
  try {
    let url = `${config.serverUrl}/admin/display-notices`;

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

export async function deleteNoticeById(id) {
  try {
    let url = `${config.serverUrl}/admin/delete-notice/${id}`;

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

export async function uploadPdf(file) {
  let url = `${config.serverUrl}/image/upload-pdf`;

  const formData = new FormData();
  formData.append("pdf", file);

  const response = await axios.post(url, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}

export async function submitNotice(notice) {
  try {
    const url = `${config.serverUrl}/admin/add-notice`;
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios.post(url, notice);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
