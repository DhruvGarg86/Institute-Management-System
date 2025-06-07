import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import ElonImg from '../../assets/elon.png';

function Profile() {
    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-9 container-fluid admin-dashboard-second">
                        <div className="admin-profile-box">
                            <div className="admin-profile-box-inside">
                                <div className="admin-profile-box-inside-left">
                                    <img src={ElonImg} alt="Elon Musk" className="admin-profile-img" />
                                </div>
                                <div className="admin-profile-box-inside-right">
                                    <div className="admin-profile-box-inside-right">
                                        <div className="admin-profile-box-inside-right">
                                            <div className="admin-profile-box-inside-right">
                                                <h2>Elon Musk</h2>
                                                <div className="profile-row">
                                                    <span className="profile-label">Role:</span>
                                                    <span className="profile-value">Admin</span><br />
                                                </div>
                                                <div className="profile-row">
                                                    <span className="profile-label">Gender:</span>
                                                    <span className="profile-value">Male</span>
                                                </div>
                                                <div className="profile-row">
                                                    <span className="profile-label">Date of Birth:</span>
                                                    <span className="profile-value">June 28, 1971</span>
                                                </div>
                                                <div className="profile-row">
                                                    <span className="profile-label">Phone:</span>
                                                    <span className="profile-value">+1 234 567 8901</span>
                                                </div>
                                                <div className="profile-row">
                                                    <span className="profile-label">Address:</span>
                                                    <span className="profile-value">
                                                        3500 Deer Creek Road, Palo Alto, CA, USA
                                                    </span>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

export default Profile;
