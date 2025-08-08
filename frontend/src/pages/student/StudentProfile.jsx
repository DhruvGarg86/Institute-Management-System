import React, { useEffect, useState } from "react";
import { FiEdit, FiSave } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { toast } from "react-toastify";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "./StudentNavbar";
import { getStudentProfile } from "../../services/Student/studentProfile";
import { getUserIdFromToken } from "../../services/Student/auth";
import axios from "axios";
import { config } from "../../services/config";
import { uploadImageUniversal } from "../../services/image";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const studentId = getUserIdFromToken();

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
      if (!studentId) {
        toast.error("User not found");
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
  }, [studentId]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024; // 2MB

      if (file.size > maxSize) {
        toast.warning("File size exceeds 2MB. Please upload a smaller image.");
        e.target.value = "";
        return;
      }

      try {
        const res = await uploadImageUniversal(file);
        setProfile((prev) => ({ ...prev, imagePath: res.fileName }));
        toast.success("Image uploaded successfully");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Image upload failed");
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `${config.serverUrl}/student/updateProfile/${studentId}`,
        {
          name: profile.name,
          phoneNumber: profile.phoneNumber,
          address: profile.address,
          imagePath: profile.imagePath,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  if (!studentId) return null;

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid py-4 bg-light" style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-md-2">
            <StudentSidebar />
          </div>
          <div className="col-md-10 d-flex justify-content-center">
            <div className="card shadow rounded-4 w-100" style={{ maxWidth: 900 }}>
              {/* Profile Image, Name, Social */}
              <div className="d-flex flex-column align-items-center py-4 border-bottom">
                <div className="position-relative text-center">
                  <img
                    src={profile.imagePath || "/default-profile.png"}
                    className="rounded-circle border shadow-sm"
                    style={{ width: 110, height: 110, objectFit: "cover" }}
                    alt="Profile"
                  />
                  {isEditing && (
                    <input
                      type="file"
                      accept="image/jpeg, image/png"
                      className="form-control mt-2"
                      style={{ maxWidth: 200 }}
                      onChange={handleImageUpload}
                    />
                  )}
                </div>
                <h3 className="mt-3 mb-2">{profile.name}</h3>
                <div className="d-flex gap-2 mt-2">
                  <a href="https://facebook.com" className="btn btn-light btn-sm rounded-circle border" target="_blank" rel="noopener noreferrer">
                    <FaFacebookF />
                  </a>
                  <a href="https://twitter.com" className="btn btn-light btn-sm rounded-circle border" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" className="btn btn-light btn-sm rounded-circle border" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                  </a>
                  <a href="https://linkedin.com" className="btn btn-light btn-sm rounded-circle border" target="_blank" rel="noopener noreferrer">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              {/* Profile Info Fields */}
              <div className="row px-4 pt-4 pb-2">
                {[
                  { label: "Name", name: "name", editable: true },
                  { label: "Email", value: profile.email },
                  { label: "Phone", name: "phoneNumber", editable: true },
                  { label: "Date of Birth", value: profile.dob },
                  { label: "Address", name: "address", editable: true },
                  { label: "Course", value: profile.courseName },
                  { label: "Gender", value: profile.gender },
                  { label: "Admission Date", value: profile.admissionDate },
                ].map((field, idx) => (
                  <div key={idx} className="col-md-6 mb-3 d-flex align-items-center">
                    <label className="me-3 fw-bold" style={{ width: "150px" }}>
                      {field.label}
                    </label>
                    {isEditing && field.editable ? (
                      <input
                        type="text"
                        name={field.name}
                        value={profile[field.name]}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      <div className="text">
                        {field.value || profile[field.name]}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="d-flex justify-content-center gap-2 pb-4">
                {isEditing ? (
                  <>
                    <button className="btn btn-success me-2" onClick={handleSave}>
                      <FiSave className="me-2" /> Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                    <FiEdit className="me-2" /> Edit Profile
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
