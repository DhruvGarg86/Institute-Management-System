import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FiEdit } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import profileImg from "../../assets/elon.jpeg"; // replace with the desired profile image

function Profile() {
    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>

                    {/* Profile Section */}
                    <div className="col-7-5 admin-dashboard-second d-flex justify-content-center">
                        <div className="profile-card">
                            {/* Profile Image */}
                            <img src={profileImg} alt="Profile" className="profile-image" />

                            {/* Name & Username */}
                            <h2 className="profile-name mb-3">Jessica Alba</h2>
                            <p className="profile-username">
                                @jennywilson <FiEdit className="edit-icon me-3" />
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

                            {/* Info Fields */}
                            <div className="profile-info mt-4">
                                <div className="profile-field">
                                    <span className="field-label">Username</span>
                                    <span className="field-value">Jenny Wilson</span>
                                    <FiEdit className="edit-icon" />
                                </div>

                                <div className="profile-field">
                                    <span className="field-label">Email</span>
                                    <span className="field-value">jenny@gmail.com</span>
                                    <FiEdit className="edit-icon" />
                                </div>

                                <div className="profile-field">
                                    <span className="field-label">Address</span>
                                    <span className="field-value">New York, USA</span>
                                    <FiEdit className="edit-icon" />
                                </div>

                                <div className="profile-field">
                                    <span className="field-label">Nickname</span>
                                    <span className="field-value">Sky Angel</span>
                                    <FiEdit className="edit-icon" />
                                </div>

                                <div className="profile-field">
                                    <span className="field-label">DOB</span>
                                    <span className="field-value">April 28, 1981</span>
                                    <FiEdit className="edit-icon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
