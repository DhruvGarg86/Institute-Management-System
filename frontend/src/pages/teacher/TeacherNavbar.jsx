import React, { useEffect, useState } from 'react';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { getTeacherName, getUserIdFromToken } from '../../services/Teacher/Dashboard';
import { toast } from 'react-toastify';

function Navbar() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [teacherName, setTeacherName] = useState("");

    const id = getUserIdFromToken()



    useEffect(() => {
        const fetchTeacherName = async (id) => {
            try {
                const response = await getTeacherName(id);
                setTeacherName(response);
            } catch (error) {
                // console.log(error);
                toast.error("Unable to load total students");
            }
        };
        fetchTeacherName(id);
    }, [id]);



    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body">
                <div className="container-fluid">
                    <div className='navbar-first-part'>
                        <h1 className="navbar-brand">TEACHER DASHBOARD</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className='navbar-second-part'>
                        <span
                            className='navbar-second-part-admin-name'
                            style={{ textDecoration: 'none', color: 'black', cursor: 'pointer' }}
                            onClick={() => navigate(`/teacher/profile/${id}`)}
                        >
                            Welcome, {teacherName}
                        </span>
                        <RiLogoutCircleRLine
                            size={24}
                            className='admin-navbar-logout'
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowLogoutModal(true)}
                        />
                    </div>
                </div>
            </nav>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h5>Are you sure you want to logout?</h5>
                        <div className="mt-3 d-flex justify-content-center gap-3">
                            <button className="btn btn-danger custom-button" onClick={handleLogOut}>Yes, Logout</button>
                            <button className="btn btn-secondary custom-button" onClick={() => setShowLogoutModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;
