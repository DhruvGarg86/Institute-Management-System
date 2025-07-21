import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ElonImg from '../../assets/elon.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Profile() {
    return (
        <>
        <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-7-5 container-fluid admin-dashboard-second">
                        <div className="admin-profile-box">
                            <div className="admin-profile-box-inside">
                                <div className="admin-profile-box-inside-left">
                                    <img src={ElonImg} alt="Elon Musk" className="admin-profile-img" />
                                </div>
                                <div className="admin-profile-box-inside-right">
                                    <div className="admin-profile-details">
                                        <h2 className="admin-profile-name fw-bold mb-4 " style={{color: 'white'}}>Elon Musk</h2>
                                        <p>Gender:Male</p>
                                        <p><strong>Email:</strong> elon.musk@example.com</p>
                                        <p><strong>Date of Birth:</strong> June 28, 1971</p>
                                        <p><strong>Address:</strong> 1 Rocket Road, Hawthorne, CA</p>
                                        <div className="admin-profile-socials mt-4">
                                            <a href="https://facebook.com" target="_blank" rel="blank" className="ms-3 social-icon" id='social-icon-facebook'>
                                                <FaFacebookF />
                                            </a>
                                            <a href="https://twitter.com" target="_blank" rel="blank" className="ms-3 social-icon" id='social-icon-twitter'>
                                                <FaTwitter />
                                            </a>
                                            <a href="https://instagram.com" target="_blank" rel="blank" className="ms-3 social-icon" id='social-icon-instagram'>
                                                <FaInstagram />
                                            </a>
                                            <a href="https://linkedin.com" target="_blank" rel="blank" className="ms-3 social-icon" id='social-icon-linkedin'>
                                                <FaLinkedinIn />
                                            </a>
                                        </div>
                                    </div>
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
