import React, { useEffect, useState } from "react";
import StudentSidebar from "./StudentSidebar";
import "./Student-module.css";
import Footer from "../../components/Footer";
import StudentNavbar from "./StudentNavbar";

import {
  getStudentAttendance,
  getStudentProfile,
} from "../../services/Student/StudentService";
import { getUserIdFromToken } from "../../services/Teacher/Dashboard";

function StudentAttendance() {
  const [attendance, setAttendance] = useState({});
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const id = getUserIdFromToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attendanceData, studentData] = await Promise.all([
          getStudentAttendance(id),
          getStudentProfile(id),
        ]);
        setAttendance(attendanceData);
        setStudent(studentData);
      } catch (err) {
        // console.error("Error fetching data:", err);
        setError("Failed to load attendance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const getAttendanceBadgeClass = (percentage) => {
    if (percentage >= 90) return "bg-success";
    if (percentage >= 75) return "bg-warning text-dark";
    return "bg-danger";
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentNavbar />
      <div className="container-fluid flex-grow-1 mt-3">
        <div className="row">
          <div className="col-12 col-md-3 col-lg-2 px-2 mb-3">
            <StudentSidebar />
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            <h2 className="mb-4 text-center fw-bold text-primary">
              📅 Student Attendance
            </h2>

            {loading && (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center" role="alert">
                {error}
              </div>
            )}

            {!loading && !error && (
              <>
                {/* Student Info Card */}
                <div className="card shadow-sm mb-4 border-0 rounded-4">
                  <div className="card-body d-flex flex-column flex-md-row align-items-center">
                    <div
                      className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-md-4 mb-3 mb-md-0 overflow-hidden shadow"
                      style={{
                        width: "80px",
                        height: "80px",
                        fontSize: "1.5rem",
                        border: "3px solid #fff",
                      }}
                    >
                      {student.imagePath ? (
                        <img
                          src={student.imagePath}
                          alt='image'
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <span>{student.name ? student.name.charAt(0).toUpperCase() : "S"}</span>
                      )}
                    </div>

                    <div>
                      <h5 className="card-title mb-1 fw-bold">{student.name}</h5>
                      <p className="mb-0 text-muted">🎓 Roll No: {student.id}</p>
                      <p className="mb-0 text-muted">📘 Course: {student.courseName}</p>
                    </div>
                  </div>
                </div>


                {/* Attendance Table */}
                {/* Attendance Cards */}
                <div className="row g-3">
                  {/* Total Days */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 rounded-4 text-center p-3 h-100">
                      <div className="text-primary fs-3 mb-2">📅</div>
                      <h6 className="text-muted">Total Working Days</h6>
                      <h4 className="fw-bold">{attendance.totalWorkingDays}</h4>
                    </div>
                  </div>

                  {/* Present Days */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 rounded-4 text-center p-3 h-100">
                      <div className="text-success fs-3 mb-2">✅</div>
                      <h6 className="text-muted">Days Present</h6>
                      <h4 className="fw-bold text-success">{attendance.presentDays}</h4>
                    </div>
                  </div>

                  {/* Absent Days */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div className="card shadow-sm border-0 rounded-4 text-center p-3 h-100">
                      <div className="text-danger fs-3 mb-2">❌</div>
                      <h6 className="text-muted">Days Absent</h6>
                      <h4 className="fw-bold text-danger">{attendance.absentDays}</h4>
                    </div>
                  </div>

                  {/* Attendance Percentage */}
                  <div className="col-12 col-sm-6 col-lg-3">
                    <div
                      className={`card shadow-lg border-0 rounded-4 text-center p-3 h-100 ${getAttendanceBadgeClass(attendance.attendancePercentage) === "bg-success"
                          ? "bg-success text-white"
                          : getAttendanceBadgeClass(attendance.attendancePercentage) === "bg-warning text-dark"
                            ? "bg-warning text-dark"
                            : "bg-danger text-white"
                        }`}
                    >
                      <div className="fs-3 mb-2">📊</div>
                      <h6>Attendance %</h6>
                      <h4 className="fw-bold">{attendance.attendancePercentage}%</h4>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentAttendance;
