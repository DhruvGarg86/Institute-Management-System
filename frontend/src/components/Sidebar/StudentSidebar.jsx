import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div className="d-flex">
        <div
          className="bg-white text-black p-3"
          style={{width: "250px", minHeight: "100vh"}}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-black" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="#">
                Course
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="#">
                Attendance
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="#">
                Fees
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentSidebar;
