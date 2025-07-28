import axios from "axios";
import { config } from "./../config";

export async function getAllNotices() {
  try {
    let url = `${config.serverUrl}/admin/display-notices`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

export async function deleteNoticeById(id) {
  try {
    let url = `${config.serverUrl}/admin/delete-notice/${id}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}

// export async function uploadNoticeFile() =  {
  
// }

export async function addNoticeByAdmin(data) {
  try {
    let url = `${config.serverUrl}/admin/add-notice`;
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.log("Exception", error.message);
    throw error;
  }
}
