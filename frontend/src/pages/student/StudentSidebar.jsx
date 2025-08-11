import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StudentComplaintForm from "./StudentAddComplaint";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [showComplaintForm, setShowComplaintForm] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex flex-column vh-100">
      <div className="accordion flex-grow-1" id="studentSidebarAccordion">
        {/* Dashboard */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              onClick={() => navigate("/student/dashboard")}
              className={`accordion-button ${isActive("/student/dashboard") ? "bg-primary text-white" : "collapsed"}`}
              type="button"
            >
              Dashboard
            </button>
          </h2>
        </div>

        {/* Profile */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              onClick={() => navigate("/student/profile")}
              className={`accordion-button ${isActive("/student/profile") ? "bg-primary text-white" : "collapsed"}`}
              type="button"
            >
              Profile
            </button>
          </h2>
        </div>

        {/* Complaint Section */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${isComplaintOpen ? "" : "collapsed"} ${location.pathname.includes("complaint") ? "bg-primary text-white" : ""
                }`}
              onClick={() => setIsComplaintOpen(!isComplaintOpen)}
              type="button"
            >
              Complaint
            </button>
          </h2>
          <div className={`accordion-collapse ${isComplaintOpen ? "show" : "collapse"}`}>
            <div className="accordion-body p-2">
              <ul className="list-unstyled ps-3">
                <li className="mb-2">
                  <button
                    className="btn btn-outline-primary w-100 btn-sm text-start"
                    onClick={() => setShowComplaintForm(true)}
                  >
                    Add Complaint
                  </button>
                  {showComplaintForm && (
                    <StudentComplaintForm onClose={() => setShowComplaintForm(false)} />
                  )}
                </li>
                <li>
                  <button
                    className="btn btn-outline-primary w-100 btn-sm text-start"
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
          <h2 className="accordion-header">
            <button
              onClick={() => navigate("/student/result")}
              className={`accordion-button ${isActive("/student/result") ? "bg-primary text-white" : "collapsed"}`}
              type="button"
            >
              Result
            </button>
          </h2>
        </div>

        {/* Attendance */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              onClick={() => navigate("/student/attendance")}
              className={`accordion-button ${isActive("/student/attendance") ? "bg-primary text-white" : "collapsed"}`}
              type="button"
            >
              Attendance
            </button>
          </h2>
        </div>

        {/* Fee */}
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              onClick={() => navigate("/student/fee")}
              className={`accordion-button ${isActive("/student/fee") ? "bg-primary text-white" : "collapsed"}`}
              type="button"
            >
              Fee
            </button>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;
