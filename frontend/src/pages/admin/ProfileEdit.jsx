import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FiEdit, FiSave } from "react-icons/fi";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { editProfile, fetchProfile, getAdminIdFromToken, uploadImage } from "../../services/Admin/Profile";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function ProfileEdit() {

    const id = getAdminIdFromToken();

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
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const res = await uploadImage(file);
                setProfile((prev) => ({ ...prev, image: res.fileName }));
                toast.success("Image uploaded successfully");
            } catch (err) {
                toast.error("Image upload failed");
                console.error(err);
            }
        }
    };


    const handleSave = async () => {
        try {
            const response = await editProfile(profile, id);
            console.log(response);
            toast.success("Profile Updated Successfully!");
            navigate(`/admin/profile/${id}`);
        } catch (error) {
            console.log(error);
            toast.error("Unable to Update Profile");
        }
    };

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

                            <div className="profile-image-container">
                                <img src={profile.image} alt="Profile" className="profile-image" />


                                <input
                                    type="file"
                                    id="profileImageInput"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleImageUpload}
                                />

                                <div
                                    className="edit-overlay"
                                    onClick={() => document.getElementById("profileImageInput").click()}
                                >
                                    <FiEdit className="overlay-icon" />
                                </div>
                            </div>

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

                            <div className="profile-info mt-4">
                                <form>
                                    <div className="profile-field1">
                                        <span className="field-label">Username</span>
                                        <input
                                            type="text"
                                            className="form-control ms-3"
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-field1">
                                        <span className="field-label">Email</span>
                                        <input
                                            type="email"
                                            className="form-control ms-3"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-field1">
                                        <span className="field-label">Address</span>
                                        <input
                                            type="text"
                                            className="form-control ms-3"
                                            value={profile.address}
                                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-field1">
                                        <span className="field-label">Number</span>
                                        <input
                                            type="text"
                                            className="form-control ms-3"
                                            value={profile.phoneNumber}
                                            onChange={(e) => setProfile({ ...profile, phoneNumber: e.target.value })}
                                        />
                                    </div>

                                    <div className="profile-field1">
                                        <span className="field-label">Gender</span>
                                        <select
                                            className="form-control ms-3"
                                            value={profile.gender}
                                            onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                        >
                                            <option value="MALE">MALE</option>
                                            <option value="FEMALE">FEMALE</option>
                                        </select>
                                    </div>
                                </form>
                            </div>

                            {/* Buttons */}
                            <div className="text-center mt-2">
                                <button
                                    className="btn btn-success"
                                    onClick={handleSave}
                                >
                                    <FiSave style={{ marginRight: "5px" }} /> Save
                                </button>
                                <button
                                    className="ms-3 btn btn-danger"
                                    onClick={() => navigate(`/admin/profile/${id}`)}
                                >
                                    <FiSave style={{ marginRight: "5px" }} /> Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileEdit;
