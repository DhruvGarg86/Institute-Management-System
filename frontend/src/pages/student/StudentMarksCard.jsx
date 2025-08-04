import React from "react";
import BarChart from "./BarChart";
import "./Student-module.css"; // Keep this only if you have extra custom styles

function StudentMarksCard() {
  const studentMarks = [
    { subject: "English", marks: 85, color: "#f8d210" },
    { subject: "Math", marks: 78, color: "#394240" },
    { subject: "Science", marks: 92, color: "#7b1113" },
    { subject: "History", marks: 70 },
    { subject: "Art", marks: 95 },
  ];

  const totalMarks = studentMarks.length * 100;
  const obtainedMarks = studentMarks.reduce((sum, item) => sum + item.marks, 0);
  const percentage = ((obtainedMarks / totalMarks) * 100).toFixed(2);

  return (
    <div className="container d-flex flex-wrap align-items-center justify-content-between my-2">
      <div className="chart-container" style={{ height: "300px", flex: "1 1 70%" }}>
        <BarChart data={studentMarks} />
      </div>

      <div className="mt-2 text-center flex-grow-1">
        <div className="d-flex flex-column justify-content-around align-items-center">
          <div className="p-2">
            <p className="text-muted small mb-1">Total Marks</p>
            <p className="h5 fw-bold mb-0">{totalMarks}</p>
          </div>
          <div className="p-2">
            <p className="text-muted small mb-1">Obtained Marks</p>
            <p className="h5 fw-bold mb-0">{obtainedMarks}</p>
          </div>
          <div className="p-2">
            <p className="text-muted small mb-1">Percentage</p>
            <p className="h5 fw-bold mb-0">{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksCard;
