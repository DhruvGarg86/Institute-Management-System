import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { getStudentById, updateStudentById } from '../../services/Admin/Student';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImageUniversal } from '../../services/image';

function EditStudent() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        phoneNumber: "",
        email: "",
        dob:"",
        joiningDate: "",
        address: "",
        course: "",
        gender: "",
        status: "",
        image: "",
    })

    const getStudent = async(id) => {
        try{
            const response = await getStudentById(id);
            console.log(response);
            setStudent(response);
        }catch(error){
            console.log(error);
            toast.error("Unable to load student details")
        }
    }
    useEffect(() => {
        getStudent(id);
    },[id]);

    const handleImageUpload = async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    const res = await uploadImageUniversal(file);
                    setStudent((prev) => ({ ...prev, image: res.fileName }));
                    toast.success("Image uploaded successfully");
                } catch (err) {
                    toast.error("Image upload failed");
                    console.error(err);
                }
            }
        };

    const updateStudent = async (e) => {
            try {
                e.preventDefault();
                await updateStudentById(student, id);
                toast.success("Teacher updated successfully");
                navigate("/admin/display-teachers");
            } catch (error) {
                console.log(error);
                toast.error("Unable to update teacher details")
            }
        }

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
                        <form className="row g-4 bg-white p-2 rounded admin-add-student-form" onSubmit={updateStudent}>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" required className="form-control" placeholder="Enter full name"
                                value={student.name} onChange={(e) => setStudent({ ...student, name: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" name="phone_number" required className="form-control" placeholder="Enter phone number"
                                value={student.phoneNumber} onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" required className="form-control" placeholder="Enter email" 
                                value={student.email} onChange={(e) => setStudent({ ...student, email: e.target.value })}/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" name="dob" required className="form-control" 
                                value={student.dob} onChange={(e) => setStudent({ ...student, dob: e.target.value })}/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Joining Date</label>
                                <input type="date" name="joining_date" required className="form-control"
                                value={student.joiningDate} onChange={(e) => setStudent({ ...student, joiningDate: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control" placeholder="Enter address" 
                                value={student.address} onChange={(e) => setStudent({ ...student, address: e.target.value })}/>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Course</label>
                                <select id="course" name="course" required className="form-control"
                                value={student.course} onChange={(e) => setStudent({ ...student, course: e.target.value })}>
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
                                <select className="form-select" name="gender" required 
                                value={student.gender} onChange={(e) => setStudent({ ...student, gender: e.target.value })}>
                                    <option value="">Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status"
                                value={student.status} onChange={(e) => setStudent({ ...student, status: e.target.value })}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label me-1">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed)</sub>
                                <input type="file" accept='.jpg, .jpeg, .png' name="image" required className="form-control" 
                                onChange={handleImageUpload}/>
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
