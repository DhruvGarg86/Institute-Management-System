import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import StudentSidebar from "../../components/Sidebar/StudentSidebar";
import "./Student.module.css";
import Footer from "../../components/Footer";
import StudentNavbar from "./StudentNavbar";


function StudentAttendance() {
  const student = {
    rollNo: "101",
    name: "Vedant Choudhari",
    course: "DAC",
  };

  const attendanceData = Array.from({ length: 30 }, (_, i) => ({
    date: `2025-07-${(i + 1).toString().padStart(2, "0")}`,
    status: i % 3 === 0 ? "Absent" : "Present",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(attendanceData.length / recordsPerPage);

  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentData = attendanceData.slice(indexOfFirst, indexOfLast);

  const totalPresentDays = attendanceData.filter(
    (entry) => entry.status === "Present"
  ).length;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    // 👇 Full-page flex container
    <div className="d-flex flex-column min-vh-100">
      <StudentNavbar />
      <div className="container-fluid flex-grow-1 mt-4">
        <div className="row">
          <div className="col-2-5">
            <StudentSidebar />
          </div>
          <div className="col-7-5">
            <h2 className="mb-4">Student Attendance</h2>

            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover">
                <thead className="table-primary">
                  <tr>
                    <th>Roll No.</th>
                    <th>Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.map((entry, index) => (
                    <tr key={index}>
                      <td>{student.rollNo}</td>
                      <td>{student.name}</td>
                      <td>{student.course}</td>
                      <td>{entry.date}</td>
                      <td>
                        <span
                          className={`badge ${
                            entry.status === "Present"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {entry.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end fw-bold">
                      Total Days Present:
                    </td>
                    <td>
                      <span className="badge bg-info">{totalPresentDays}</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <nav className="d-flex justify-content-center">
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 && "disabled"}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i}
                    className={`page-item ${currentPage === i + 1 && "active"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages && "disabled"
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* 👇 Footer always at the bottom */}
      <Footer />
    </div>
  );
}

export default StudentAttendance;
