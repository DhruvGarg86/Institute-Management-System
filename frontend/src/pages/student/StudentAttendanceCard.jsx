import React, { useEffect, useState } from "react";
import MyPieChart from "./MyPieChart";
import { getStudentAttendance, getUserIdFromToken } from "../../services/Student/StudentService"; // Adjust path


function StudentAttendanceCard() {
  const [data, setData] = useState(null);
  const studentId = getUserIdFromToken();

  useEffect(() => {
    if (!studentId) return;

    getStudentAttendance(studentId)
      .then((attendance) => {
        const chartData = [
          { x: "Present", y: attendance.presentDays },
          { x: "Absent", y: attendance.absentDays },
        ];
        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching attendance:", error);
      });
  }, [studentId]);

  return (
    <div style={{ height: "300px" }} className="text-center w-100">
      {data ? <MyPieChart data={data} /> : <p>Loading attendance...</p>}
    </div>
  );
}

export default StudentAttendanceCard;
