import React from 'react';
import Dashboard from '../pages/admin/Dashboard';
import profileImg from '../assets/profile.svg';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="accordion"
        id="accordionPanelsStayOpenExample"
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >

        {/* Dashboard */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button onClick={() => navigate("/admin/dashboard")}
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Dashboard
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
          </div>
        </div>

        {/* Student */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Student
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate("/admin/add-student")}>Add Student</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate("/admin/display-students")}>Display All Student</button></li>
                <li><button type="button" className='sidebar-inner-button'>Student Attendance</button></li>
                <li><button type="button" className='sidebar-inner-button'>Student Marks</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Teacher
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
                <li><button type="button" className='sidebar-inner-button'>Display All Teachers</button></li>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Courses
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
                <li><button type="button" className='sidebar-inner-button'>Display All Teachers</button></li>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
                <li><button type="button" className='sidebar-inner-button'>Add Teacher</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Notices
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionPanelsStayOpenExample"
          >
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/add-notice')}> Add New Notice</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-notices')}>Display All Notices</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Profile - pinned at bottom */}
        <div className="accordion-item" style={{ marginTop: 'auto' }}>
          <h2 className="accordion-header" id="headingSix">
            <button className="accordion-button sidebar-profile" type="button"
              style={{ borderRadius: '10px' }} onClick={() => navigate('/admin/profile')}>
              <img src={profileImg} alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  marginRight: '40px',
                  objectFit: 'cover',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
                }}
              />
              Profile
            </button>
          </h2>
        </div>

      </div>
    </div>
  );
}

export default Sidebar;
