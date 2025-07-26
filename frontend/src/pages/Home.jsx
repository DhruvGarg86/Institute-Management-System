import React from 'react';

function Home() {
    return (
        <div>
            {/* Sticky Header */}
            <header className="header">
                <nav className="navbar">
                    <div className="logo">IMS</div>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#login">Login</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>

                {/* Hero Section */}
                <div className="hero" id="home">
                    <h1>Welcome to Our Institute Management System</h1>
                    <p>Manage students, staff, and operations seamlessly — all in one platform.</p>
                    <button className="cta-btn">Explore Features</button>
                </div>
            </header>

            {/* Content Section */}
            <section className="content" id="features">
                <h2>Smart Solutions for Modern Education</h2>
                <div className="features">
                    <div className="feature">
                        <h3>🎓 Student Management</h3>
                        <p>Automate admission, attendance, grading, and communication.</p>
                    </div>
                    <div className="feature">
                        <h3>👩‍🏫 Staff Management</h3>
                        <p>Handle staff records, payrolls, and performance in one dashboard.</p>
                    </div>
                    <div className="feature">
                        <h3>📊 Reporting & Analytics</h3>
                        <p>Visualize data and make better decisions with real-time analytics.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer" id="contact">
                <p>© 2025 Your Institute Name | All rights reserved.</p>
                <div className="footer-links">
                    <a href="#">Privacy</a> | <a href="#">Terms</a> | <a href="#">Support</a>
                </div>
                <div className="social-icons">
                    <span>🌐</span> <span>📘</span> <span>🐦</span>
                </div>
            </footer>
        </div>
    );
}

export default Home;
