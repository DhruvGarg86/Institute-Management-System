import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getComplaintById, updateComplaint } from '../../services/Admin/Complaint';

function EditComplaint() {

    const navigate = useNavigate();

    const [complaint, setComplaint] = useState({
        studentName: "",
        courseName: "",
        dateOfComplaint: "",
        description: "",
        status: ""
    });

    const { id } = useParams();

    const getComplaint = async (id) => {
        try {
            const response = await getComplaintById(id);
            setComplaint(response);
            console.log(response);
        } catch (error) {
            toast.error("Failed to load complaint");
            console.log(error);
        }
    }

    useEffect(() => {
        getComplaint(id);
    }, [id]);

    const handleStatusChange = (e) => {
        setComplaint((prev) => ({
            ...prev,
            status: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateComplaint(id, { status: complaint.status });
            toast.success("Complaint status updated successfully");
            setTimeout(() => {
                navigate("/admin/display-complaints");
            }, 500);
        } catch (error) {
            toast.error("Failed to update complaint status");
            console.error(error);
        }
    };

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

                            <form onSubmit={handleSubmit}>
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
                                            value={complaint.courseName}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={complaint.dateOfComplaint}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label fw-bold">Status</label>
                                        <select
                                            name="status"
                                            className="form-select"
                                            value={complaint.status}
                                            required
                                            onChange={handleStatusChange}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="ACTIVE">Active</option>
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
