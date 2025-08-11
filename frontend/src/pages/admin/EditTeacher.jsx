import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { toast } from 'react-toastify';
import { fetchTeacherById, submitTeacherById } from '../../services/Admin/Teacher';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImage } from '../../services/Admin/Profile';
import { config } from '../../services/config';

function EditTeacher() {

    const { id } = useParams();
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
    })

    const getTeacher = async (id) => {
        try {
            const response = await fetchTeacherById(id);
            // console.log(response);
            setTeacher(response);

        } catch (error) {
            // console.log(error);
            toast.error("Unable to load teacher details")
        }
    }
    useEffect(() => {
        getTeacher(id);
    }, [id]);

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const res = await uploadImage(file);
                const teacherUrl = `${config.serverUrl}${res.fileName}`;
                setTeacher(prev => ({ ...prev, image: teacherUrl }));
                toast.success("Image uploaded successfully");
            } catch (err) {
                toast.error("Image upload failed");
                // console.error(err);
            }
        }
    };
    const submitTeacher = async (e) => {
        try {
            e.preventDefault();
            await submitTeacherById(teacher, id);
            toast.success("Teacher updated successfully");
            navigate("/admin/display-teachers");
        } catch (error) {
            // console.log(error);
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
                        <h2 className="text-primary mb-4 fw-bold admin-add-student-heading">Edit Teacher</h2>
                        <form className="row g-4 bg-white p-4 rounded admin-add-student-form mt-2" onSubmit={submitTeacher}>

                            <div className="col-md-6">
                                <label className="form-label">Full Name</label>
                                <input type="text" name="name" required className="form-control"
                                    placeholder="Enter full name" value={teacher.name} onChange={(e) => setTeacher({ ...teacher, name: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number</label>
                                <input type="text" name="phone_number" required className="form-control"
                                    placeholder="Enter phone number" value={teacher.phoneNumber} onChange={(e) => setTeacher({ ...teacher, phoneNumber: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email</label>
                                <input type="email" name="email" required className="form-control"
                                    placeholder="Enter email" value={teacher.email} onChange={(e) => setTeacher({ ...teacher, email: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Salary</label>
                                <input type="number" inputMode='decimal' step="0.01" name="salary" required
                                    className="form-control" placeholder='Enter salary' value={teacher.salary} onChange={(e) => setTeacher({ ...teacher, salary: e.target.value })} />

                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Joining Date</label>
                                <input type="date" inputMode='decimal' step="0.01" name="joiningDate" required
                                    className="form-control" placeholder='Enter salary' value={teacher.joiningDate} onChange={(e) => setTeacher({ ...teacher, joiningDate: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input type="text" name="address" required className="form-control"
                                    placeholder="Enter address" value={teacher.address} onChange={(e) => setTeacher({ ...teacher, address: e.target.value })} />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Gender</label>
                                <select className="form-select" name="gender" required value={teacher.gender}
                                    onChange={(e) => setTeacher({ ...teacher, gender: e.target.value })}>
                                    <option value="">Select gender</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Status</label>
                                <select className="form-select" name="status" value={teacher.status}
                                    onChange={(e) => setTeacher({ ...teacher, status: e.target.value })}>
                                    <option value="ACTIVE">Active</option>
                                    <option value="INACTIVE">Inactive</option>
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Upload Image</label><sub>(Only .jpg, .jpeg and .png files are allowed)</sub>
                                <input type="file" accept='.jpg, .jpeg, .png' name="image" className="form-control"
                                    onChange={handleImageUpload} />
                            </div>

                            <div className="col-12 text-center">
                                <button type="submit" className="btn btn-primary px-4 custom-button-primary">
                                    Update
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
