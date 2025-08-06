import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri"; // Logout icon
import { FaUserCircle, FaKey, FaSignOutAlt } from "react-icons/fa"; // Icons for Profile, Change Password, Logout
import { useNavigate } from "react-router-dom";

function TeacherNavbar() {
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = () => {
    // Simulate a delay for logout, then navigate to the home page
    setTimeout(() => {
      navigate("/");
    }, 500); // 500ms delay
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Navbar Brand/Title */}
        <h1 className="navbar-brand mb-0 h1 fw-bold text-primary">
          TEACHER DASHBOARD
        </h1>

        {/* Navbar Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Collapse Section */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">
            {/* Profile Dropdown */}
            <li className="nav-item dropdown me-3">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaUserCircle size={24} className="me-2 text-secondary" />
                <span className="fw-semibold text-dark">TEACHER NAME</span>
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => navigate("/teacher/profile")}
                  >
                    <FaUserCircle className="me-2" /> Profile
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => navigate("/teacher/change-password")}
                  >
                    <FaKey className="me-2" /> Change Password
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center text-danger"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="me-2" /> Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TeacherNavbar;
