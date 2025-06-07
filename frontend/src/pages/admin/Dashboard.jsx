import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import Card from '../../components/Card';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-3 admin-dashboard-first">
            <Sidebar />
          </div>
          <div className="col-9 container-fluid admin-dashboard-second">
            <div className="row admin-dashboard-second-row1">
              <div className="col row1-first">
                <h3>
                  <FaUserGraduate style={{ marginRight: '10px' }} />
                  Total Students
                </h3>
                <div>
                  <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>30</h2>
                </div>
              </div>
              <div className="col row1-second">
                <h3>
                  <FaChalkboardTeacher style={{ marginRight: '10px' }} />
                  Total Teachers
                </h3>
                <div>
                  <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>30</h2>
                </div>
              </div>
              <div className="col row1-third">
                <h3>
                  <MdMenuBook style={{ marginRight: '10px' }} />
                  Total Courses
                </h3>
                <div>
                  <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>30</h2>
                </div>
              </div>
            </div>

            <div className="row admin-dashboard-second-row2">
              <div className="col-8 row2-first">
                <div className="row2-first-inner-div">
                  <h2 style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>Top Student</h2>
                  <div className="row2-first-inner-div-profile">
                    <Card />
                  </div>
                </div>
              </div>
              <div className="col-4 row2-second">
                <div className="row2-first-inner-div">
                  <h3 className='row2-second-notice' style={{ fontWeight: 'bold' }}>Notices</h3>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                  <a href="https://youtu.be/dQw4w9WgXcQ?si=hrNKl2Yo5v__sVXd&t=43" target='blank' className='admin-dashboard-notice-link'>
                    <div className='row2-second-notice-item'>
                      <p style={{ fontWeight: 'bold', marginBottom: '-2px' }}>May 21, 2025</p>
                      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>Exam on May 25, 2025</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}

export default Dashboard;
