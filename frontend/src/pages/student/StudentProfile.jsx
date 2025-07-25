import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import defaultPhoto from "../../assets/student_profile_photo.jpg"; // adjust based on your structure
import Navbar from "../../components/Navbar";
import StudentSidebar from "../../components/Sidebar/StudentSidebar";
import "./Student.module.css";
import Footer from "../../components/Footer";
import StudentNavbar from "./StudentNavbar";


function StudentProfile() {
  const [formData, setFormData] = useState({
    firstName: "Vedant",
    lastName: "Choudhari",
    rollNo: "101",
    course: "DAC",
    email: "vedant@example.com",
    phone: "9876543210",
    address: "Pune, Maharashtra",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [errors, setErrors] = useState({});

  const validateImage = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 10 * 1024 * 1024; // 10 MB

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG or PNG images are allowed.";
    }

    if (file.size > maxSize) {
      return "Image size must not exceed 10MB.";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePhoto") {
      const file = files[0];
      const imageError = file ? validateImage(file) : "";
      setErrors((prev) => ({ ...prev, profilePhoto: imageError }));

      setFormData((prev) => ({
        ...prev,
        profilePhoto: imageError ? null : file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (errors.profilePhoto) {
      newErrors.profilePhoto = errors.profilePhoto;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("Updated Profile:", formData);
    alert("Profile updated successfully!");
  };

  const photoPreview = formData.profilePhoto
    ? URL.createObjectURL(formData.profilePhoto)
    : defaultPhoto;

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2-5">
            <StudentSidebar />
          </div>
          <div className="col-7-5">
            <div>
              <h2 className="text-center mt-4 student-center">Profile</h2>
            </div>
            <div className="container-fluid mt-4 d-flex justify-content-center">
              <div
                className="card shadow p-4"
                style={{ maxWidth: "700px", width: "100%" }}
              >
                <form onSubmit={handleSubmit} className="row g-3">
                  {/* Profile Photo Upload */}
                  <div className="col-12 d-flex justify-content-center mb-3">
                    <label
                      htmlFor="profilePhoto"
                      style={{ cursor: "pointer" }}
                      className="text-center"
                    >
                      <div className="position-relative">
                        <img
                          src={photoPreview}
                          alt="Profile"
                          className="rounded-circle border border-3 border-primary shadow"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="mt-2 text-primary">
                        <FaUpload className="me-2" />
                        Change Profile Photo
                      </div>
                      <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </label>
                    {errors.profilePhoto && (
                      <div className="text-danger mt-2 text-center w-100">
                        {errors.profilePhoto}
                      </div>
                    )}
                  </div>

                  {/* Read-only Fields */}
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.firstName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.lastName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Roll No</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.rollNo}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Course</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.course}
                      disabled
                      readOnly
                    />
                  </div>

                  {/* Editable Fields */}
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      rows="2"
                      value={formData.address}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="New password"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        errors.confirmPassword ? "is-invalid" : ""
                      }`}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  <div className="col-12 text-center mt-3">
                    <button type="submit" className="btn btn-success px-4">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudentProfile;
