import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaChevronDown } from 'react-icons/fa';

const sampleStudents = [
    {
        name: "Aarav Sharma",
        roll: "01",
        address: "D-45, Connaught Place, New Delhi",
        studentClass: "01",
        dob: "02/05/2005",
        phone: "+91 9876543210",
        avatar: "https://i.pravatar.cc/40?img=1",
    },
    {
        name: "Ananya Verma",
        roll: "10",
        address: "C-12, Bandra West, Mumbai",
        studentClass: "02",
        dob: "03/04/2004",
        phone: "+91 9123456780",
        avatar: "https://i.pravatar.cc/40?img=2",
    },
    {
        name: "Rohan Patel",
        roll: "04",
        address: "45-A, Navrangpura, Ahmedabad",
        studentClass: "01",
        dob: "12/05/2005",
        phone: "+91 9988776655",
        avatar: "https://i.pravatar.cc/40?img=3",
    },
    {
        name: "Meera Iyer",
        roll: "03",
        address: "22, T. Nagar, Chennai",
        studentClass: "02",
        dob: "03/05/2005",
        phone: "+91 8877665544",
        avatar: "https://i.pravatar.cc/40?img=4",
    },
    {
        name: "Aditya Singh",
        roll: "15",
        address: "67, Gomti Nagar, Lucknow",
        studentClass: "04",
        dob: "12/05/2005",
        phone: "+91 7766554433",
        avatar: "https://i.pravatar.cc/40?img=5",
    },
    {
        name: "Kavya Reddy",
        roll: "01",
        address: "9-10, Banjara Hills, Hyderabad",
        studentClass: "04",
        dob: "12/03/2005",
        phone: "+91 7654321098",
        avatar: "https://i.pravatar.cc/40?img=6",
    },
    {
        name: "Vikram Desai",
        roll: "11",
        address: "101, Koregaon Park, Pune",
        studentClass: "01",
        dob: "03/05/2006",
        phone: "+91 7098765432",
        avatar: "https://i.pravatar.cc/40?img=7",
    }
];

function DisplayStudent() {
    const [students] = useState(sampleStudents);
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="container-fluid admin-dashboard-container">
                <div className="row admin-dashboard-row">
                    <div className="col-3 admin-dashboard-first">
                        <Sidebar />
                    </div>
                    <div className="col-9 admin-dashboard-second p-4">
                        <div className="card p-4 shadow">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>Students List</h4>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search by name or roll" />
                                        <span className="input-group-text cursor-pointer"><FaSearch /></span>
                                    </div>
                                </div>
                            </div>

                            <div className="table-responsive">
                                <table className="table table-hover align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Students Name</th>
                                            <th>Roll</th>
                                            <th>Address</th>
                                            <th>Class</th>
                                            <th>Date of Birth</th>
                                            <th>Phone</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={index}>
                                                <td><input type="checkbox" /></td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <img src={student.avatar} alt="avatar" className="rounded-circle me-2" width="40" height="40" />
                                                        {student.name}
                                                    </div>
                                                </td>
                                                <td>{student.roll}</td>
                                                <td>{student.address}</td>
                                                <td>{student.studentClass}</td>
                                                <td>{student.dob}</td>
                                                <td>{student.phone}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-light text-primary me-2" onClick={() => navigate(`/admin/student-marks/${student.roll}`)}>View Marks</button>
                                                    <button className="btn btn-sm btn-light me-2" onClick={() => navigate(`/admin/edit-student/${student.roll}`)}><FaEdit /></button>
                                                    <button className="btn btn-sm btn-light text-danger"><FaTrash /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-center align-items-center mt-3">
                                <div>
                                    <button className="btn btn-sm btn-outline-secondary me-1 ">{'<'}</button>
                                    {[1, 2, 3, 4, 5].map((page) => (
                                        <button key={page} className={`btn btn-sm me-1 ${page === 1 ? 'btn-primary' : 'btn-outline-secondary'}`}>
                                            {page}
                                        </button>
                                    ))}
                                    <button className="btn btn-sm btn-outline-secondary">{'>'}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DisplayStudent;
