import React, {  useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StudentSidebar from "./StudentSidebar";
import "./Student-module.css";
import Footer from "../../components/Footer";
import StudentNavbar from "./StudentNavbar";

import {
  getStudentAttendance,
  getStudentProfile,
  getUserIdFromToken,
} from "../../services/Student/StudentService";

function StudentAttendance() {
  const [attendance, setAttendance] = useState({});

  const[student, setStudent] = useState({});
  const id = getUserIdFromToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStudentAttendance(id);
        setAttendance(data);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchStudentData = async (id) => {
      try {
        const data = await getStudentProfile(id);
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch attendance data:", error);
      }
    };

    fetchStudentData(id);
  }, [id]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <StudentNavbar />
      <div className="container-fluid flex-grow-1 mt-2">
        <div className="row">
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>
          <div className="col-10">
            <h2 className="mb-4 text-center">Student Attendance</h2>

            {attendance && (
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead className="table-primary">
                    <tr>
                      <th>Roll No.</th>
                      <th>Name</th>
                      <th>Course</th>
                      <th>Total Working Days</th>
                      <th>Days Present</th>
                      <th>Days Absent</th>
                      <th>Attendance %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.courseName}</td>
                      <td>{attendance.totalWorkingDays}</td>
                      <td>
                        <span className="badge bg-success">
                          {attendance.presentDays}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-danger">
                          {attendance.absentDays}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info">
                          {attendance.attendancePercentage}%
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StudentAttendance;
