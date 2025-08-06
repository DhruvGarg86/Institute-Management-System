import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StudentComplaintForm from "./StudentAddComplaint";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  return (
    <div
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      className="d-flex flex-column h-100"
    >
      <div
        className="accordion"
        id="accordionPanelsStayOpenExample"
        style={{ display: "flex", flexDirection: "column", flex: 1 }}
      >
        {/* Dashboard */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={() => navigate("/student/dashboard")}
              className={`accordion-button collapsed ${
                location.pathname === "/student/dashboard"
                  ? "active-section"
                  : ""
              }`}
              type="button"
            >
              Dashboard
            </button>
          </h2>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              onClick={() => navigate("/student/profile")}
              className={`accordion-button collapsed ${
                location.pathname === "/student/profile" ? "active-section" : ""
              }`}
              type="button"
            >
              Profile
            </button>
          </h2>
        </div>

        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className={`accordion-button ${
                isComplaintOpen ? "" : "collapsed"
              } ${
                location.pathname.includes("complaint") ? "active-section" : ""
              }`}
              onClick={() => setIsComplaintOpen(!isComplaintOpen)}
              type="button"
            >
              Complaint
            </button>
          </h2>
          <div
            className={`accordion-collapse ${
              isComplaintOpen ? "" : "collapse"
            }`}
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: "none" }} className="sidebar-inner">
                <li>
                  <button
                    type="button"
                    className="sidebar-inner-button"
                    onClick={() => setShowComplaintForm(true)}
                  >
                    Add Complaint
                  </button>

                  {showComplaintForm && (
                    <StudentComplaintForm
                      onClose={() => setShowComplaintForm(false)}
                    />
                  )}
                </li>
                <li>
                  <button
                    type="button"
                    className="sidebar-inner-button"
                    onClick={() => navigate("/student/display-complaints")}
                  >
                    Display All Complaints
                  </button>
                </li>
              </ul>
            </div>  
          </div>
        </div>

        {/* Exam */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              onClick={() => navigate("/student/exam")}
              className={`accordion-button collapsed ${
                location.pathname === "/student/exam" ? "active-section" : ""
              }`}
              type="button"
            >
              Exam
            </button>
          </h2>
        </div>

        {/* Attendance */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              onClick={() => navigate("/student/attendance")}
              className={`accordion-button collapsed ${
                location.pathname === "/student/attendance"
                  ? "active-section"
                  : ""
              }`}
              type="button"
            >
              Attendance
            </button>
          </h2>
        </div>

        {/* Fee */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              onClick={() => navigate("/student/fee")}
              className={`accordion-button collapsed ${
                location.pathname === "/student/fee" ? "active-section" : ""
              }`}
              type="button"
            >
              Fee
            </button>
          </h2>
        </div>

        {/* Profile - pinned at bottom */}
        {/* <div className="accordion-item" style={{ marginTop: "auto" }}>
          <h2 className="accordion-header" id="headingSix">
            <button
              className={`accordion-button sidebar-profile ${
                location.pathname === "/student/profile" ? "active-section" : ""
              }`}
              type="button"
              onClick={() => navigate("/student/profile")}
            >
              <img
                src={profileImg}
                alt="Profile"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "40px",
                  objectFit: "cover",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              />
              Profile
            </button>
          </h2>
        </div> */}
      </div>
    </div>
  );
}

export default StudentSidebar;
