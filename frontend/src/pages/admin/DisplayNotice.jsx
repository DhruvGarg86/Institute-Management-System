import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { FaTrash } from 'react-icons/fa';

function DisplayNotice() {
    const [notices, setNotices] = useState([
        {
            id: 1,
            title: 'Holiday Notice',
            date: '2025-08-15',
            description: 'College will remain closed on Independence Day.',
            link: 'https://www.google.com',
        },
        {
            id: 2,
            title: 'Exam Schedule',
            date: '2025-09-20',
            description: 'Mid-sem exams start from 20th September.',
            link: 'https://exam-link.com',
        },
        {
            id: 3,
            title: 'Seminar',
            date: '2025-10-01',
            description: 'AI Seminar on 1st October in the auditorium.',
            link: 'https://seminar-link.com',
        },
        {
            id: 4,
            title: 'Sports Day',
            date: '2025-11-05',
            description: 'Annual sports day will be celebrated with various events.',
            link: 'https://sports-link.com',
        },
        {
            id: 5,
            title: 'Workshop',
            date: '2025-12-10',
            description: 'Coding workshop on JavaScript for beginners.',
            link: 'https://workshop-link.com',
        },
    ]);

    // ✅ State to track which notice is expanded
    const [expandedId, setExpandedId] = useState(null);

    const handleDelete = (id) => {
        const updatedNotices = notices.filter(notice => notice.id !== id);
        setNotices(updatedNotices);
    };

    // ✅ Toggle expand on click
    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-7-5 admin-dashboard-second admin-display-notice p-4">
                        <h2 className="mb-4 fw-bold text-primary">All Notices</h2>

                        {/* ✅ Display notices in 3 per row grid */}
                        <div className="row g-3">
                            {notices.map(notice => (
                                <div className="col-md-4" key={notice.id}>
                                    <div
                                        className={`notice-card p-3 shadow-sm rounded ${expandedId === notice.id ? 'expanded' : ''}`}
                                        onClick={() => toggleExpand(notice.id)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'transform 0.2s ease-in-out',
                                            height: '160px',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div className="notice-header d-flex justify-content-between align-items-start">
                                            <h5 className="fw-bold">{notice.title}</h5>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // ✅ Prevent triggering expand when deleting
                                                    handleDelete(notice.id);
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <span className="notice-date text-muted small">{notice.date}</span>
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

export default DisplayNotice;
