import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { uploadImageUniversal } from '../../services/image';
import { addStudent, getCoursesList } from '../../services/Admin/Student';

function AddStudent() {

    const navigate = useNavigate();

    const [student, setStudent] = useState({
        name: '',
        phoneNumber: '',
        email: '',
        address: '',
        imagePath: '',
        gender: '',
        admissionDate: '',
        dob: '',
        courseName: ''
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
                const res = await uploadImageUniversal(file);
                setStudent(prev => ({ ...prev, imagePath: res.fileName }));
                toast.success("Image uploaded successfully");
            } catch (error) {
                console.log(error);
                toast.error("Image upload failed");
            }
        }
    };

    const [courses, setCourses] = useState([]);
    const getCourses = async () => {
        try {
            const response = await getCoursesList();
            setCourses(response);
        } catch (error) {
            console.log(error);
            toast.error("Unable to get courses");
        }
    };

    useEffect(() => {
        getCourses();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addStudent(student);
            toast.success("Student added successfully");
            navigate("/admin/display-students");
        } catch (error) {
            toast.error("Failed to add student");
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
                        <h2 className="text-primary mb-5 fw-bold admin-add-student-heading">Add Student</h2>
                        <form className="row g-4 bg-white p-4 rounded admin-add-student-form" onSubmit={handleSubmit}>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" required className="form-control" placeholder="Enter full name"
                                    onChange={(e) => setStudent(prev => ({ ...prev, name: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" name="phone_number" required className="form-control" placeholder="Enter phone number"
                                    onChange={(e) => setStudent(prev => ({ ...prev, phoneNumber: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" required className="form-control" placeholder="Enter email"
                                    onChange={(e) => setStudent(prev => ({ ...prev, email: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="dob" required className="form-control"
                                    onChange={(e) => setStudent(prev => ({ ...prev, dob: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Admission Date</label>
                                <input type="date" name="email" required className="form-control" placeholder="Enter admission date"
                                    onChange={(e) => setStudent(prev => ({ ...prev, admissionDate: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control" placeholder="Enter address"
                                    onChange={(e) => setStudent(prev => ({ ...prev, address: e.target.value }))} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Course</label>
                                <select
                                    id="course"
                                    name="course"
                                    required
                                    className="form-control"
                                    value={student.courseName}
                                    onChange={(e) => setStudent(prev => ({ ...prev, courseName: e.target.value }))}
                                >
                                    <option value="">Select Course</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.name}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select" name="gender" required value={student.gender}
                                    onChange={(e) => setStudent(prev => ({ ...prev, gender: e.target.value }))}
                                >
                                    <option value="">Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed)</sub>
                                <input type="file" accept='.jpg, .jpeg, .png' name="image" className="form-control"
                                    onChange={handleImageUpload} />
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
