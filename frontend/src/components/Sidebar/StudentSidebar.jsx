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
      <div class="d-flex align-items-start w-100">
        <div
          class="nav flex-column nav-pills me-3 w-100"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            className="nav-link active w-100"
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
            className="nav-link w-100"
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
            class="nav-link w-100"
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
            class="nav-link w-100"
            id="v-pills-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-messages"
            type="button"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Messages
          </button>
          <button
            class="nav-link w-100"
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
        <div class="tab-content" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-dashboard"
            role="tabpanel"
            aria-labelledby="v-pills-dashboard-tab"
            tabindex="0"
          ></div>
          <div
            class="tab-pane fade"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
            tabindex="0"
          ></div>
          <div
            class="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
            tabindex="0"
          ></div>
          <div
            class="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
            tabindex="0"
          ></div>
          <div
            class="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
            tabindex="0"
          ></div>
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;
