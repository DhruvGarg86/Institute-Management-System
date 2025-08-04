import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FaTrash } from "react-icons/fa";
import { deleteNoticeById, getAllNotices } from "../../services/Admin/Notices";
import { toast } from "react-toastify";

function DisplayNotice() {
    const [notices, setNotices] = useState([]);
    const [expandedId, setExpandedId] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const fetchNotices = async () => {
        try {
            const response = await getAllNotices();
            if (response.length == 0) {
                toast.info("No notices to display");
            } else {
                console.log(response);
                setNotices(response);
            }
        } catch (error) {
            console.error("Error fetching notices:", error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const confirmDelete = async () => {
        try {
            await deleteNoticeById(selectedNotice.id);
            fetchNotices();
            setShowModal(false);
            setSelectedNotice(null);
            toast.info("Notice deleted successfully");
        } catch (error) {
            console.error("Error deleting notice:", error);
        }
    };


    const handleDeleteClick = (notice) => {
        setSelectedNotice(notice);
        setShowModal(true);
    };

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
                                                <span className="small text-dark">({notice.audience})</span>
                                            </div>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteClick(notice);
                                                }}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <span className="notice-date text-muted small">
                                            {new Date(notice.date).toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <div className="notice-description mt-2" dangerouslySetInnerHTML={{ __html: notice.description }} />
                                        <div className="notice-description-link mt-2">
                                            <a
                                                href={notice.filePath}
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

            {showModal && (
                <div className="modal show fade d-block" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow ">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger fw-bold">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete{" "}
                                    <strong>{selectedNotice?.title}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default DisplayNotice;
