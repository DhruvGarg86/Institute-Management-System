import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { getStudentMarks } from "../../services/Student/studentMarksService"; // Adjust path as needed
import { getUserIdFromToken } from "../../services/Student/auth";
import "./Student-module.css";

function StudentMarksCard() {
  const [marksData, setMarksData] = useState(null);
  const studentId = getUserIdFromToken(); // Assuming you have a function to get the student ID

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await getStudentMarks(studentId);
        setMarksData(response);
      } catch (err) {
        console.error("Error fetching marks", err);
      }
    };

    fetchMarks();
  }, [studentId]);

  if (!marksData) return <p>Loading...</p>;

  const chartData = marksData?.subjectMarks?.map((item) => ({
    subject: item.subjectName,
    marks: item.marksObtained,
  }));

  return (
    <div className="container d-flex flex-wrap align-items-center justify-content-between my-2">
      <div
        className="chart-container"
        style={{ height: "300px", flex: "1 1 70%" }}
      >
        <BarChart data={chartData} />
      </div>

      <div className="mt-2 text-center flex-grow-1">
        <div className="d-flex flex-column justify-content-around align-items-center">
          <div className="p-2">
            <p className="text-muted small mb-1">Total Marks</p>
            <p className="h5 fw-bold mb-0">{marksData.totalMarks}</p>
          </div>
          <div className="p-2">
            <p className="text-muted small mb-1">Obtained Marks</p>
            <p className="h5 fw-bold mb-0">{marksData.totalMarksObtained}</p>
          </div>
          <div className="p-2">
            <p className="text-muted small mb-1">Percentage</p>
            <p className="h5 fw-bold mb-0">
              {marksData.percentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksCard;
