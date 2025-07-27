import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

function EditStudent() {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Student added successfully");
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-2-5 admin-dashboard-first">
                        <Sidebar />
                    </div>

                    <div className="col-7-5 admin-dashboard-second p-4">
                        <h2 className="text-primary mb-4 fw-bold admin-add-student-heading">Edit Student</h2>
                        <form className="row g-4 bg-white p-2 rounded admin-add-student-form" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" required className="form-control" placeholder="Enter full name" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" name="phone_number" required className="form-control" placeholder="Enter phone number" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" required className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="dob" required className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Joining Date</label>
                                <input type="date" name="joining_date" required className="form-control" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control" placeholder="Enter address" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Course</label>
                                <select id="course" name="course" required className="form-control">
                                    <option value="">Select Course</option>
                                    <option value="1">Web Development</option>
                                    <option value="1">Web Development</option>
                                    <option value="1">Web Development</option>
                                    <option value="1">Web Development</option>
                                    <option value="2">Data Science</option>
                                    <option value="3">Cyber Security</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select" name="gender" required>
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label me-1">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed)</sub>
                                <input type="file" accept='.jpg, .jpeg, .png' name="image" required className="form-control" />
                            </div>


                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary px-4 custom-button-primary">
                                    Update Details
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditStudent;
