import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import defaultPhoto from "../../assets/student_profile_photo.jpg";
import "./Student-module.css";

function StudentNavbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setDropdownOpen(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg bg-light px-3">
      <div className="container-fluid justify-content-between">
        <h4 className="navbar-brand m-0">STUDENT DASHBOARD</h4>

        <div className="dropdown" ref={dropdownRef}>
          <img
            src={defaultPhoto}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <ul
              className="dropdown-menu dropdown-menu-end show mt-2"
              style={{ position: "absolute", right: 0 }}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/student/profile");
                    setDropdownOpen(false);
                  }}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    navigate("/student/change-password");
                    setDropdownOpen(false);
                  }}
                >
                  Change Password
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StudentNavbar;
