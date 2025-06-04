import React from 'react'
import studyImg from '../../assets/study.svg';
import { useNavigate } from 'react-router-dom';

function Login() {
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
                            <h3>LOGIN</h3>
                            <h5>Enter your account details  </h5>
                            <input type="text" name="" placeholder="Email ID" className="admin-login-page-second-login-box" /><br />
                            <input type="password" name="" placeholder="Password" className="admin-login-page-second-login-box" />
                            <div>
                                <button onClick={() => navigate("/admin/dashboard")}
                                className="admin-login-page-second-button">LOGIN</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
