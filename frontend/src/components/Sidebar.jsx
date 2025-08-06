import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import profileImg from '../assets/profile.svg';
import { getAdminIdFromToken } from '../services/Admin/Profile';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const id = getAdminIdFromToken();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="accordion" id="accordionPanelsStayOpenExample" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

        {/* Dashboard */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className={`accordion-button ${location.pathname !== "/admin/dashboard" ? "collapsed" : ""} ${location.pathname === "/admin/dashboard" ? 'active-section' : ''}`}
              type="button"
            >
              Dashboard
            </button>
          </h2>
        </div>


        {/* Student */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className={`accordion-button collapsed ${location.pathname.startsWith('/admin/student') || location.pathname.includes('student') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Student
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate("/admin/add-student")}>Add Student</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate("/admin/display-students")}>Display All Student</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/student-attendance')}>Student Attendance</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/student-marks')}>Student Marks</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/student-fees')}>Student Fees</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className={`accordion-button collapsed ${location.pathname.includes('teacher') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Teacher
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/add-teacher')}>Add Teacher</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-teachers')}>Display All Teachers</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/teacher-attendance')}>Teacher   Attendance</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className={`accordion-button collapsed ${location.pathname.includes('course') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Courses
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/add-course')}>Add Course</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-courses')}>Display All Courses</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Notices */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingNotices">
            <button
              className={`accordion-button collapsed ${location.pathname.includes('notice') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseNotices"
              aria-expanded="false"
              aria-controls="collapseNotices"
            >
              Notices
            </button>
          </h2>
          <div id="collapseNotices" className="accordion-collapse collapse" aria-labelledby="headingNotices" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/add-notice')}>Add New Notice</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-notices')}>Display All Notices</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Subjects */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSubjects">
            <button
              className={`accordion-button collapsed ${location.pathname.includes('subject') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSubjects"
              aria-expanded="false"
              aria-controls="collapseSubjects"
            >
              Subjects
            </button>
          </h2>
          <div id="collapseSubjects" className="accordion-collapse collapse" aria-labelledby="headingSubjects" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/add-subject')}>Add New Subject</button></li>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-subjects')}>Display All Subjects</button></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Complaints */}
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingComplaints">
            <button
              className={`accordion-button collapsed ${location.pathname.includes('complaint') ? 'active-section' : ''}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseComplaints"
              aria-expanded="false"
              aria-controls="collapseComplaints"
            >
              Complaints
            </button>
          </h2>
          <div id="collapseComplaints" className="accordion-collapse collapse" aria-labelledby="headingComplaints" data-bs-parent="#accordionPanelsStayOpenExample">
            <div className="accordion-body">
              <ul style={{ listStyleType: 'none' }} className='sidebar-inner'>
                <li><button type="button" className='sidebar-inner-button' onClick={() => navigate('/admin/display-complaints')}>Display All Complaints</button></li>
              </ul>
            </div>
          </div>
        </div>


        {/* Profile - pinned at bottom */}
        <div className="accordion-item" style={{ marginTop: 'auto' }}>
          <h2 className="accordion-header" id="headingSix">
            <button
              className={`accordion-button sidebar-profile ${location.pathname.startsWith('/admin/profile') ? 'active-section' : ''}`}
              type="button"
              onClick={() => navigate(`/admin/profile/${id}`)}
            >
              <img src={profileImg} alt="Profile"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '2px solid white',
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
