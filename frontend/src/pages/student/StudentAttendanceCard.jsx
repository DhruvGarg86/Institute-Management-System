import React, { useEffect, useState } from "react";
import MyPieChart from "./MyPieChart";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "../../services/Student/StudentService"; // Adjust path
import axios from "axios";
import { config } from "../../services/config";


function StudentAttendanceCard() {
  const [datas, setDatas] = useState({
    studentId: '',
    presentDays: '',
    absentDays: '',
    totalWorkingDays: '',
    attendancePercentage: '',
  });
  const studentId = getUserIdFromToken();

  useEffect(() => {
    if (!studentId) return;

    const fetchData = async (studentId) => {
      try {
        const response = await axios.get(`${config.serverUrl}/student/dashboard/attendance/${studentId}`);
        const data = response.data;
        setDatas(data);
      } catch (error) {
        toast.error("Failed to load attendance data");
        console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchData(studentId);
  }, [studentId]);

  return (
    <div style={{ height: "150px" }} className="text-center w-100">
      {datas ? <MyPieChart data={datas} /> : <p>Loading attendance...</p>}
    </div>
  );
}

export default StudentAttendanceCard;
