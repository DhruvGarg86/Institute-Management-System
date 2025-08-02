import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

function EditComplaint() {
    const [complaint, setComplaint] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        async function fetchComplaint() {
            try {
                const dummyComplaint = {
                    studentName: "Aarav Sharma",
                    course: "B.Tech Computer Science",
                    date: "2025-08-02",
                    status: "PENDING",
                    description: "WiFi is not working properly in the library."
                };

                setComplaint(dummyComplaint);
                setStatus(dummyComplaint.status);
            } catch (error) {
                toast.error("Failed to load complaint");
            }
        }

        fetchComplaint();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const updatedComplaint = { status };

            // await updateComplaintByAdmin(complaint.id, updatedComplaint);
            toast.success("Complaint updated successfully!");
        } catch (error) {
            toast.error("Failed to update complaint");
        }
    };

    if (!complaint) {
        return <p className="text-center mt-5">Loading complaint...</p>;
    }

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    {/* Sidebar */}
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-7-5 admin-dashboard-second p-4 admin-notice-box">
                        <h2 className="mb-2 fw-bold text-primary">Edit Complaint</h2>

                        <div className="card p-3 shadow-sm mb-5 admin-add-notice-box">
                            <h3 className="mb-1 mx-auto fw-bold">Complaint Details</h3>

                            <form onSubmit={handleUpdate} encType="multipart/form-data">

                                {/* Two-column layout for top fields */}
                                <div className="row mt-4">
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Student Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={complaint.studentName}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Course</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={complaint.course}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={new Date(complaint.date).toLocaleDateString('en-GB')}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Status</label>
                                        <select
                                            name="status"
                                            className="form-select"
                                            value={status}
                                            required
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="RESOLVED">Resolved</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Description</label>
                                    <textarea
                                        className="form-control bg-light"
                                        style={{ resize: 'none' }}
                                        value={complaint.description}
                                        readOnly
                                        rows={11}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn admin-add-notice-button btn-success">
                                        Update Complaint
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditComplaint;
