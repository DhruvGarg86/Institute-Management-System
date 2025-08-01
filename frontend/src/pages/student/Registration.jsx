import React from 'react'
import studyImg from '../../assets/study.svg';
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="container-fluid admin-login-page-container">
                <div className="row admin-login-page-row">
                    <div className="col-6 admin-login-page-first">
                        <div id="row1">
                            <h1>Welcome to</h1>
                            <h2>Inderaprastha Engineering College</h2>
                        </div>
                        <div id="row2">
                            <img src={studyImg} alt="Image" />
                        </div>
                    </div>
                    <div className="col-6 admin-login-page-second">
                        <div className="login-box">
                            <h3>REGISTRATION</h3>
                            <h5>Enter your details  </h5>
                            <input type="text" name="" placeholder="Email ID" className="admin-login-page-second-login-box" /><br />
                            <input type="number" name="" placeholder="Contact Number" className="admin-login-page-second-login-box" />
                            <div>
                                <button onClick={() => navigate("/login")}
                                    className="admin-login-page-second-button">REGISTER</button>
                            </div>
                            <p style={{ marginTop: '20px', fontSize: '15px'     }}>
                                Already have an account?{' '}
                                <Link to="/login" style={{ color: '#4361e5', fontWeight: 'bold', textDecoration: 'none' }}>
                                    Login Here!
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration
