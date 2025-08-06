import axios from "axios";
import { config } from "../config";

export async function getEveryNotice() {
  const url = `${config.serverUrl}/teacher/notices/display-notices`;
  console.log(url)
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`
  };
  const response = await axios.get(url, { headers });
  console.log(await axios.get(url, { headers }))
  return response.data;
}