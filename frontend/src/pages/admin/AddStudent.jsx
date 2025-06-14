import React from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

function AddStudent() {

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Student added successfully");
    };

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>

                    <div className="col-9 admin-dashboard-second p-4">
                        <h2 className="text-primary mb-5 fw-bold admin-add-student-heading">Add Student</h2>
                        <form className="row g-4 bg-white p-4 rounded admin-add-student-form" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label className="form-label">First Name</label>
                                <input type="text" name="first_name" required className="form-control" placeholder="Enter first name" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name</label>
                                <input type="text" name="last_name" required className="form-control" placeholder="Enter last name" />
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
                                <input type="date" name="dob"required className="form-control" />
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
                                <label className="form-label">Select Course</label>
                                <select id="course" name="course" required className="form-control">
                                    <option value="">-- Select Course --</option>
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



                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary px-4 custom-button-primary">
                                    Add Student
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddStudent;
