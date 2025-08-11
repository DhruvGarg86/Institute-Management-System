import React, { useEffect, useState } from "react";
import MyPieChart from "./MyPieChart";
import { toast } from "react-toastify";
import { getUserIdFromToken } from "../../services/Student/StudentService";
import axios from "axios";
import { config } from "../../services/config";

function StudentAttendanceCard() {
  const [datas, setDatas] = useState(null);
  const studentId = getUserIdFromToken();

  useEffect(() => {
    if (!studentId) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/student/dashboard/attendance/${studentId}`
        );
        setDatas(response.data);
      } catch (error) {
        toast.error("Failed to load attendance data");
        // console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchData();
  }, [studentId]);

  return (
    <div
      className="shadow-lg rounded-4 p-4 h-100"
      style={{
        background: "linear-gradient(135deg, #ffffff, #f0f7ff)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.08)";
      }}
    >
      <h5
        className="mb-4 text-primary fw-bold text-center"
        style={{
          fontSize: "1.25rem",
          borderBottom: "2px solid rgba(0, 123, 255, 0.2)",
          paddingBottom: "8px",
        }}
      >
        📊 Attendance Overview
      </h5>

      {datas ? (
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-4">
          {/* Chart */}
          <div
            style={{
              flex: "0 0 410px",
              height: "220px",
              width: "220px",
              background: "#fff",
              borderRadius: "16px",
              padding: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MyPieChart data={datas} />
          </div>

          {/* Stats */}
          <div
            style={{
              flex: "1",
              background: "#fff",
              borderRadius: "16px",
              padding: "20px 24px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <p className="mb-3" style={{ fontSize: "1rem" }}>
              <strong className="text-success">✅ Present:</strong>{" "}
              {datas.presentDays}
            </p>
            <p className="mb-3" style={{ fontSize: "1rem" }}>
              <strong className="text-danger">❌ Absent:</strong>{" "}
              {datas.absentDays}
            </p>
            <p className="mb-3" style={{ fontSize: "1rem" }}>
              <strong className="text-info">📅 Total Days:</strong>{" "}
              {datas.totalWorkingDays}
            </p>
            <p
              className="fw-bold mt-4"
              style={{
                fontSize: "1.4rem",
                color:
                  datas.attendancePercentage >= 75 ? "#28a745" : "#dc3545",
              }}
            >
              {datas.attendancePercentage}% Attendance
            </p>
          </div>
        </div>
      ) : (
        <p className="text-muted text-center">⏳ Loading attendance...</p>
      )}
    </div>
  );
}

export default StudentAttendanceCard;
