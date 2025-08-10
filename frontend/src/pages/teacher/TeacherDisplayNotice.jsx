import React, { useEffect, useState } from 'react';
import TeacherNavbar from "./TeacherNavbar";
import TeacherSidebar from "./TeacherSidebar";
import { getEveryNotice } from '../../services/Teacher/TeacherNotice';
import { toast } from 'react-toastify';

function TeacherDisplayNotice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getEveryNotice();
        setNotices(data);
      } catch (error) {
        // console.log(error)
        toast.error("Unable to load notices");
      }
    };
    fetchNotices();
  }, []);

  // State to track which notice is expanded
  const [expandedId, setExpandedId] = useState(null);


  // Toggle expand on click
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <>
      <TeacherNavbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <TeacherSidebar />
          </div>
          <div className="col-7-5 admin-dashboard-second admin-display-notice p-4">
            <h2 className="mb-4 fw-bold text-primary">All Notices</h2>
            {/* Display notices in 3 per row grid */}
            <div className="row g-3">
              {notices.map((notice) => (
                <div className="col-md-4" key={notice.id}>
                  <div
                    className={`notice-card p-3 shadow-sm rounded ${expandedId === notice.id ? "expanded" : ""
                      }`}
                    onClick={() => toggleExpand(notice.id)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.2s ease-in-out",
                      height: "160px",
                      overflow: "hidden",
                    }}
                  >
                    <div className="notice-header d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="fw-bold mb-1">{notice.title}</h5>
                      </div>
                    </div>
                    <span className="notice-date text-muted small">
                      {notice.date}
                    </span>
                    <div className="notice-description mt-2">
                      {notice.description}
                    </div>
                    <div className="notice-description-link mt-2">
                      <a
                        href={notice.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="admin-dashboard-notice-link"
                      >
                        Notice if PDF/Image is available
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDisplayNotice;
