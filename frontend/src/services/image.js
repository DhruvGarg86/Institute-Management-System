import axios from "axios";
import { config } from "./config";

export async function uploadImageUniversal(file) {
  const token = localStorage.getItem("token");
  const url = `${config.serverUrl}/image/upload`;

  const formData = new FormData();
  formData.append("image", file);

  const headers = {
    Authorization: `Bearer ${token}`, 
    "Content-Type": "multipart/form-data",
  };

  const response = await axios.post(url, formData, { headers });
  return response.data;
}