import React, { useEffect, useState } from "react";
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
import {
  getStudentProfile,
  updateStudentProfile,
} from "../../services/Student/studentProfile";
import { getUserIdFromToken } from "../../services/Student/auth";
import axios from "axios";
import { config } from "../../services/config";

function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false);
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
    image: defaultPhoto,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const studentId = getUserIdFromToken();
      if (!studentId) {
        toast.error("User not found");
        return;
      }

      try {
        const data = await getStudentProfile(studentId);
        setProfile({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          address: data.address,
          image: data.imagePath || defaultPhoto,
          gender: "Male",
          dob: "2000-01-01",
          admissionDate: "2023-07-15",
          courseName: data.courseName,
          status: "Active",
        });
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        toast.error("Could not load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    const studentId = getUserIdFromToken();
    if (!studentId) {
      toast.error("User not found");
      return;
    }

    try {
      await axios.put(
        `${config.serverUrl}/student/updateProfile/${studentId}`,
        {
          name: profile.name,
          phoneNumber: profile.phoneNumber,
          address: profile.address,
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
      console.error("Error:", err);
      toast.error("Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-2">
            <StudentSidebar />
          </div>
          <div className="col-md-10 d-flex justify-content-center">
            <div className="card w-100 shadow p-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block">
                  <img
                    src={profile.image}
                    alt="Profile"
                    className="rounded-circle shadow"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover" }}
                  />
                  {isEditing && (
                    <input
                      type="file"
                      className="form-control mt-2"
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          imageFile: e.target.files[0],
                          image: URL.createObjectURL(e.target.files[0]),
                        }))
                      }
                    />
                  )}
                </div>
                <h4 className="mt-3">{profile.name}</h4>
                <div className="d-flex justify-content-center gap-3 mt-2">
                  <a href="#">
                    <FaFacebookF />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaInstagram />
                  </a>
                  <a href="#">
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>

              {/* Profile Fields */}
              <div className="row">
                {[
                  { label: "Name", value: profile.name, name: "name" },
                  {
                    label: "Phone",
                    value: profile.phoneNumber,
                    name: "phoneNumber",
                  },
                  { label: "Address", value: profile.address, name: "address" },
                ].map((field, idx) => (
                  <div className="mb-3 col-md-6" key={idx}>
                    <label className="form-label">{field.label}</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={field.name}
                        value={field.value}
                        onChange={handleChange}
                        className="form-control"
                      />
                    ) : (
                      <p className="form-control-plaintext">{field.value}</p>
                    )}
                  </div>
                ))}

                {[
                  { label: "Email", value: profile.email },
                  { label: "Gender", value: profile.gender },
                  { label: "Date of Birth", value: profile.dob },
                  { label: "Admission Date", value: profile.admissionDate },
                  { label: "Course", value: profile.courseName },
                ].map((field, idx) => (
                  <div className="mb-3 col-md-6" key={idx}>
                    <label className="form-label">{field.label}</label>
                    <p className="form-control-plaintext">{field.value}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="text-center">
                {isEditing ? (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      <FiSave className="me-1" /> Save
                    </button>
                    <button
                      className="btn btn-secondary me-2"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
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
