import React from 'react'
import { RiLogoutCircleRLine } from 'react-icons/ri';

function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body">
                <div className="container-fluid">
                    <div className='navbar-first-part'>
                        <h1 className="navbar-brand">ADMIN DASHBOARD</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className='navbar-second-part'>
                        <span className='navbar-second-part-admin-name'>Admin Name</span>
                        <RiLogoutCircleRLine size={24} color="#333" />
                    </div>

                </div>
            </nav>
        </div>
    )
}

export default Navbar
