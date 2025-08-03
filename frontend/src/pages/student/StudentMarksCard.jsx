import React from "react";
import BarChart from "./BarChart";

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
    <div className="w-100 flex items-center">
      <div style={{ height: "300px" }} className="w-100">
        <BarChart data={studentMarks} />
      </div>

      <div className="mt-4 text-center">
        <div className="flex flex-col justify-around items-center">
          <div className="p-2">
            <p className="text-sm text-gray-500">Total Marks</p>
            <p className="text-lg font-semibold">{totalMarks}</p>
          </div>
          <div className="p-2">
            <p className="text-sm text-gray-500">Obtained Marks</p>
            <p className="text-lg font-semibold">{obtainedMarks}</p>
          </div>
          <div className="p-2">
            <p className="text-sm text-gray-500">Percentage</p>
            <p className="text-lg font-semibold">{percentage}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentMarksCard;
