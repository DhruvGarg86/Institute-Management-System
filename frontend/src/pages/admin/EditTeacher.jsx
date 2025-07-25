import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';

function EditTeacher() {

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
                        <h2 className="text-primary mb-4 fw-bold admin-add-student-heading">Edit Teacher</h2>
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
                                <label className="form-label">Salary</label>
                                <input type="number" inputMode='decimal' step="0.01" name="salary" required className="form-control" placeholder='Enter salary' />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control" placeholder="Enter address" />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Subjects</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    className="form-control"
                                    multiple
                                    size="3"
                                >
                                    <optgroup label="Web Development">
                                        <option value="html">HTML</option>
                                        <option value="css">CSS</option>
                                        <option value="javascript">JavaScript</option>
                                        <option value="react">React</option>
                                    </optgroup>

                                    <optgroup label="Data Science">
                                        <option value="python">Python</option>
                                        <option value="statistics">Statistics</option>
                                        <option value="ml">Machine Learning</option>
                                        <option value="dl">Deep Learning</option>
                                    </optgroup>

                                    <optgroup label="Cyber Security">
                                        <option value="networking">Networking</option>
                                        <option value="cryptography">Cryptography</option>
                                        <option value="ethical_hacking">Ethical Hacking</option>
                                        <option value="forensics">Digital Forensics</option>
                                    </optgroup>
                                </select>
                                <small className="form-text text-muted">
                                    Hold Ctrl (Windows) or Cmd (Mac) to select multiple subjects.
                                </small>
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
                                <label className="form-label">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed)</sub>
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

export default EditTeacher;
