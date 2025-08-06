    import React, { useState, useEffect } from "react";
import TeacherSidebar from './TeacherSidebar';
import TeacherNavbar from './TeacherNavbar';
    import { FiEdit } from "react-icons/fi";
    import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

    import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../services/Teacher/Dashboard";
import { fetchProfile } from "../../services/Teacher/TeacherProfile";

    function TeacherProfile() {

        const id = getUserIdFromToken();
          console.log(id);

        const [profile, setProfile] = useState({
            name: "",
            email: "",
            address: "",
            phoneNumber: "",
            gender: "",
            image: null
        });
        const navigate = useNavigate();

        const getProfile = async () => {
            try {
                const response = await fetchProfile(id);
                setProfile(response);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        useEffect(() => {
            getProfile();
        }, []);

        return (
            <>
                <TeacherNavbar />
                <div className="container-fluid admin-dashboard-container">
                    <div className="row admin-dashboard-row">
                        <div className="col-2-5 admin-dashboard-first">
                            <TeacherSidebar />
                        </div>

                        {/* Profile Section */}
                        <div className="col-7-5 admin-dashboard-second d-flex justify-content-center">
                            <div className="profile-card">

                                {/* Profile Image Section */}
                                <div className="profile-image-container">
                                    <img src={profile.image} alt="Profile" className="profile-image" />

                                    <input
                                        type="file"
                                        id="profileImageInput"
                                        accept="image/*"
                                        style={{ display: "none" }}
                                    />
                                </div>

                                {/* Name & Username */}
                                <h2 className="profile-name mb-3">{profile.name}</h2>
                                <p className="profile-username">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" id="social-icon-facebook">
                                        <FaFacebookF />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" id="social-icon-twitter">
                                        <FaTwitter />
                                    </a>
                                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" id="social-icon-instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" id="social-icon-linkedin">
                                        <FaLinkedinIn />
                                    </a>
                                </p>

                                {/* Profile Info */}
                                <div className="profile-info mt-4">
                                    <div className="profile-field">
                                        <span className="field-label">Username</span>
                                        <span className="field-value">{profile.name}</span>
                                    </div>

                                    <div className="profile-field">
                                        <span className="field-label">Email</span>
                                        <span className="field-value">{profile.email}</span>
                                    </div>

                                    <div className="profile-field">
                                        <span className="field-label">Address</span>
                                        <span className="field-value">{profile.address}</span>
                                    </div>

                                    <div className="profile-field">
                                        <span className="field-label">Phone Number</span>
                                        <span className="field-value">+91 {profile.phoneNumber}</span>
                                    </div>

                                    <div className="profile-field">
                                        <span className="field-label">Gender</span>
                                        <span className="field-value">{profile.gender}</span>
                                    </div>
                                </div>

                                <div className="text-center mt-3 mb-2">
                                    <button
                                        className="edit-profile-btn"
                                        onClick={() => navigate(`/teacher/profile/edit/${id}`)}
                                    >
                                        <FiEdit style={{ marginRight: "5px" }} /> Edit Profile
                                    </button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default TeacherProfile;
