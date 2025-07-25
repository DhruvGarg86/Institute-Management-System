import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
      }}
    >
      <div className="d-flex align-items-start w-100">
        <div
          className="nav flex-column nav-pills me-3 w-100"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className={`nav-link w-100 ${
              location.pathname === "/student/dashboard" ? "active" : ""
            }`}
            id="v-pills-dashboard-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-dashboard"
            type="button"
            role="tab"
            aria-controls="v-pills-dashboard"
            aria-selected="true"
            onClick={() => navigate("/student/dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`nav-link w-100 ${
              location.pathname === "/student/profile" ? "active" : ""
            }`}
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-home"
            type="button"
            role="tab"
            aria-controls="v-pills-home"
            aria-selected="false"
            onClick={() => navigate("/student/profile")}
          >
            Profile
          </button>
          <button
            className={`nav-link w-100 ${
              location.pathname === "/student/exam" ? "active" : ""
            }`}
            id="v-pills-course-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-exam"
            type="button"
            role="tab"
            aria-controls="v-pills-exam"
            aria-selected="false"
            onClick={() => navigate("/student/exam")}
          >
            Exam
          </button>
          <button
            className={`nav-link w-100 ${
              location.pathname === "/student/attendance" ? "active" : ""
            }`}
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-profile"
            type="button"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
            onClick={() => navigate("/student/attendance")}
          >
            Attendance
          </button>

          <button
            className={`nav-link w-100 ${
              location.pathname === "/student/fee" ? "active" : ""
            }`}
            id="v-pills-settings-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-settings"
            type="button"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
            onClick={() => navigate("/student/fee")}
          >
            Fee
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;
