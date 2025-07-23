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
    ]);

    const handleDelete = (id) => {
        const updatedNotices = notices.filter(notice => notice.id !== id);
        setNotices(updatedNotices);
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
                        <div className="notice-container">

                            {notices.map(notice => (
                                <div className="notice-card" key={notice.id}>
                                    <div className="notice-header">
                                        <h5 className="fw-bold ms-2 mb-4">{notice.title}</h5>
                                        <div>
                                            <span className="notice-date me-3">{notice.date}</span>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(notice.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="notice-description">
                                        {notice.description}
                                    </div>
                                    <div className="notice-description-link mb-2">
                                        <a href={notice.link} target="_blank" rel="noopener noreferrer">
                                            Notice if PDF/Image is available
                                        </a>
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
