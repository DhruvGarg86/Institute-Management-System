import { useState } from 'react'
import studyImg from '../../assets/study.svg';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getLogin } from '../../services/Login';

function Login() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (name === '' && password === '') {
            toast.error("Please enter email and password");
            return;
        } else if (name === '') {
            toast.error("Please enter email");
            return;
        } else if (password === '') {
            toast.error("Please enter password");
            return;
        }

        try {
            const response = await getLogin(name, password);
            if (response.status === 200) {
                const { token, role } = response.data;

                localStorage.setItem("token", token);
                localStorage.setItem("role", role);

                toast.success("Welcome");
                
                if (role === 'ADMIN') {
                    navigate("/admin/dashboard");
                } else if (role === 'STUDENT') {
                    navigate("/student/dashboard");
                } else if (role === 'TEACHER') {
                    navigate("/teacher/dashboard");
                } else {
                    navigate("/login");
                }
            } else {
                toast.error("Invalid email or password");
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data || "Invalid email or password");
            } else {
                toast.error("Unable to login");
            }
        }
    };

   

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
                            <input type="text" name="" placeholder="Email ID"
                                className="admin-login-page-second-login-box" onChange={(e) => setName(e.target.value)} /><br />
                            <input type="password" name="" placeholder="Password"
                                className="admin-login-page-second-login-box" onChange={(e) => setPassword(e.target.value)} />
                            <div>
                                <button onClick={() => handleLogin()}
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
