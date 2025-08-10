import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import "./Student-module.css";
import { getStudentProfile, getUserIdFromToken } from "../../services/Student/StudentService";
import axios from "axios";

function ChangePassword() {
  const navigate = useNavigate();
  const studentId = getUserIdFromToken();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getStudentProfile(studentId);
        setFormData((prev) => ({ ...prev, email: response.email }));
      } catch (err) {
        // console.error("Failed to fetch profile:", err);
        toast.error("Could not load profile");
      }
    };
    fetchProfile();
  }, [studentId]);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleOldPasswordVisibility = () => setShowOldPassword(!showOldPassword);
  const toggleRepeatPasswordVisibility = () => setShowRepeatPassword(!showRepeatPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.newPassword !== formData.repeatPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/auth/changePassword/change-password",
        {
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message || "Password changed successfully!");

      setFormData((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
      }));

      setTimeout(() => navigate("/student/profile"), 1500);
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Password change failed";
      toast.error(errMsg);
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="student-dashboard-container d-flex">
        <div className="student-dashboard-first">
          <StudentSidebar />
        </div>
        <div className="full-height-center p-4">
          <div
            className="card p-4 shadow"
            style={{ width: "100%", maxWidth: "500px" }}
          >
            <h4 className="mb-4 text-center">🔒 Change Password</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Old Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock />
                  </span>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    name="oldPassword"
                    className="form-control"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleOldPasswordVisibility}
                    tabIndex={-1}
                  >
                    {showOldPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">New Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    className="form-control"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Repeat New Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <FiLock />
                  </span>
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    name="repeatPassword"
                    className="form-control"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={toggleRepeatPasswordVisibility}
                    tabIndex={-1}
                  >
                    {showRepeatPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
