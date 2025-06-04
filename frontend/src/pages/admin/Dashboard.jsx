import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';

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
                  <h1>Top Performer</h1>
                </div>
              </div>
              <div className="col-4 row2-second">
                <div className="row2-first-inner-div">
                  <h1>Top Notices</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
