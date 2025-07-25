import React from 'react'
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

function StudentNavbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        setTimeout(() => {
            navigate("/");
        }, 500); // in ms
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body">
                <div className="container-fluid">
                    <div className='navbar-first-part'>
                        <h1 className="navbar-brand">STUDENT DASHBOARD</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className='navbar-second-part'>
                        <span className='navbar-second-part-admin-name'><a href='/admin/profile' style={{textDecoration: 'none', color: 'black'}}>Dhruv Garg</a></span>
                        <RiLogoutCircleRLine size={24} className='admin-navbar-logout' 
                        onClick={() => handleLogout()}
                        />
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default StudentNavbar
