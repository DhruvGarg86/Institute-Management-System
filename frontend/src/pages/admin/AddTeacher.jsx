import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { uploadImage } from '../../services/Admin/Profile';
import { addTeacher } from '../../services/Admin/Teacher';
import { useNavigate } from 'react-router-dom';
import { config } from '../../services/config';

function AddTeacher() {

    const navigate = useNavigate();

    const [teacher, setTeacher] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        salary: "",
        joiningDate: "",
        address: "",
        gender: "",
        image: ""
    });

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const maxSize = 2 * 1024 * 1024; // 2MB in bytes

            // Check file size
            if (file.size > maxSize) {
                toast.warning("File size exceeds 2MB. Please upload a smaller image.", {
                    autoClose: 2000
                });
                e.target.value = "";
                return;
            }

            try {
                const res = await uploadImage(file);
                const teacherUrl = `${config.serverUrl}${res.fileName}`;
                setTeacher(prev => ({ ...prev, image: teacherUrl }));
                toast.success("Image uploaded successfully");
            } catch (error) {
                console.log(error);
                toast.error("Image upload failed");
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTeacher(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addTeacher(teacher);
            toast.success("Teacher added successfully");
            navigate("/admin/display-teachers");
        } catch (error) {
            toast.error("Failed to add teacher");
            console.error(error);
        }
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
                        <h2 className="text-primary mb-3 fw-bold admin-add-student-heading">Add Teacher</h2>
                        <form className="row g-4 bg-white p-4 rounded admin-add-student-form mt-2" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" required className="form-control" placeholder="Enter full name" value={teacher.name} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" name="phoneNumber" required className="form-control" placeholder="Enter phone number" value={teacher.phoneNumber} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" required className="form-control" placeholder="Enter email" value={teacher.email} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Salary</label>
                                <input type="number" step="0.01" name="salary" required className="form-control" placeholder="Enter salary" value={teacher.salary} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Joining Date</label>
                                <input type="date" name="joiningDate" required className="form-control" value={teacher.joiningDate} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control" placeholder="Enter address" value={teacher.address} onChange={handleChange} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select" name="gender" required value={teacher.gender} onChange={handleChange}>
                                    <option value="">Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed. File Size should be less than 2MB.)</sub>
                                <input
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    name="image"
                                    className="form-control"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary px-4 custom-button-primary">
                                    Add Teacher
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddTeacher;
