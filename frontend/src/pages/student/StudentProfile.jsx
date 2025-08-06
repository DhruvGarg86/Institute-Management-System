import React, { useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import defaultPhoto from "../../assets/student_profile_photo.jpg";
import { toast } from "react-toastify";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import "./Student-module.css";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Vedant Choudhari",
    email: "vedant@example.com",
    phoneNumber: "9876543210",
    address: "Pune, Maharashtra",
    gender: "Male",
    dob: "2000-01-01",
    admissionDate: "2023-07-15",
    courseName: "DAC",
    status: "Active",
    image: defaultPhoto,
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, image: imageUrl }));
      toast.success("Image uploaded successfully");
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success("Profile saved!");
    console.log("Saving:", profile);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    email: profile.email,
    newPassword: "",
    repeatPassword: "",
  });

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = () => {
    if (passwordData.newPassword !== passwordData.repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Simulate password update
    toast.success("Password changed successfully!");
    console.log("Password Change Data:", passwordData);

    // Close modal
    setShowPasswordModal(false);
    setPasswordData({
      email: profile.email,
      newPassword: "",
      repeatPassword: "",
    });
  };

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid student-dashboard-container">
        <div className="row student-dashboard-row">
          <div className="col-2-5 student-dashboard-first">
            <StudentSidebar />
          </div>
          <div className="col-7-5 student-dashboard-second d-flex justify-content-center align-items-center">
            <div className="profile-card-improved">
              {/* Profile Card Header */}
              <div className="profile-header text-center p-4">
                <div className="profile-image-container-improved mb-3">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="profile-image-improved"
                  />
                  {isEditing && (
                    <div className="image-edit-overlay">
                      <label htmlFor="profileImageInput">
                        <FiEdit size={24} className="edit-icon" />
                      </label>
                      <input
                        type="file"
                        id="profileImageInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>
                <h3 className="profile-name-improved mb-1">{profile.name}</h3>
                <div className="social-icons mt-2">
                  <a href="#" className="social-icon me-2">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="social-icon me-2">
                    <FaTwitter />
                  </a>
                  <a href="#" className="social-icon me-2">
                    <FaInstagram />
                  </a>
                  <a href="#" className="social-icon">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              {/* Profile Details Section */}
              <div className="profile-details-improved p-4">
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Name</div>
                  <div className="col-8">
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={profile.name}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="form-control-plaintext">
                        {profile.name}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Phone</div>
                  <div className="col-8">
                    {isEditing ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="form-control-plaintext">
                        {profile.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Address</div>
                  <div className="col-8">
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        className="form-control"
                        value={profile.address}
                        onChange={handleChange}
                      />
                    ) : (
                      <div className="form-control-plaintext">
                        {profile.address}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Email</div>
                  <div className="col-8">
                    <div className="form-control-plaintext">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Gender</div>
                  <div className="col-8">
                    <div className="form-control-plaintext">
                      {profile.gender}
                    </div>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Date of Birth</div>
                  <div className="col-8">
                    <div className="form-control-plaintext">{profile.dob}</div>
                  </div>
                </div>
                <div className="row mb-3 align-items-center">
                  <div className="col-4 text-muted">Admission Date</div>
                  <div className="col-8">
                    <div className="form-control-plaintext">
                      {profile.admissionDate}
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-4 text-muted">Course</div>
                  <div className="col-8">
                    <div className="form-control-plaintext">
                      {profile.courseName}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="card-footer text-center p-3">
                {isEditing ? (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      <FiSave className="me-1" /> Save
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                    <div className="mt-2">
                      <button
                        className="btn btn-warning"
                        onClick={() => setShowPasswordModal(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    <FiEdit className="me-1" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentProfile;
