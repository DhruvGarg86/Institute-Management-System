import React from "react";
import MyPieChart from "./MyPieChart";
import pieData from "../../data/pieData";

function StudentAttendanceCard() {
  return (
    <div style={{ height: "300px" }} className="text-center w-100">
      <MyPieChart data={pieData} />
    </div>
  );
}

export default StudentAttendanceCard;
