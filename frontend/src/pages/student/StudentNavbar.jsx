import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Student-module.css";
import { toast } from "react-toastify";
import { getStudentProfile } from "../../services/Student/studentProfile";
import { getUserIdFromToken } from "../../services/Student/auth";


function StudentNavbar() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    gender: "",
    dob: "",
    admissionDate: "",
    courseName: "",
    status: "",
    imagePath: "",
  });
  useEffect(() => {
    const fetchProfile = async () => {
      const studentId = getUserIdFromToken();
      if (!studentId) {
        return;
      }

      try {
        const response = await getStudentProfile(studentId);
        setProfile(response);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Could not load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setTimeout(() => {
      navigate("/login");
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
          <span className="me-2 fw-bold">
            {profile.name}
          </span>
          <img
            src={profile.imagePath}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            onClick={() => setDropdownOpen(!dropdownOpen)} u
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
