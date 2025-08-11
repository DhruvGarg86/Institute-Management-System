import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";
import { config } from "../../services/config";
import { getUserIdFromToken } from "../../services/Teacher/Dashboard";

function StudentResult() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const studentId = getUserIdFromToken();
    if (!studentId) {
      // console.error("Student ID not found from token.");
      return;
    }

    const getStudentData = async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/student/dashboard/marks/${studentId}`
        );
        setStudentData(response.data);
      } catch (error) {
        // console.error("Failed to fetch student data:", error);
      }
    };

    getStudentData();
  }, []);

  if (!studentData) return null;

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-2">
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>

          {/* Main Content */}
          <div className="col-10">
            <h2 className="mb-4 text-center fw-bold text-primary">Exam Result</h2>
            {/* Results Table */}
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-hover align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Subject</th>
                    <th>Marks Obtained</th>
                    <th>Max Marks</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.subjectMarks.map((subject, index) => {
                    const status =
                      subject.marksObtained >= subject.totalMarks * 0.4
                        ? "Pass"
                        : "Fail";
                    return (
                      <tr key={index}>
                        <td>{subject.subjectName}</td>
                        <td>{subject.marksObtained}</td>
                        <td>{subject.totalMarks}</td>
                        <td>
                          <span
                            className={`badge rounded-pill px-3 py-2 ${status === "Pass" ? "bg-success" : "bg-danger"
                              }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Stats Cards */}
            <div className="row mt-4 g-3">
              <div className="col-md-4">
                <div className="card text-center shadow border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-1 text-muted">Marks Obtained</p>
                    <h4 className="fw-bold text-primary">
                      {studentData.totalMarksObtained}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-1 text-muted">Total Marks</p>
                    <h4 className="fw-bold text-warning">
                      {studentData.totalMarks}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card text-center shadow border-0 bg-light">
                  <div className="card-body">
                    <p className="mb-1 text-muted">Percentage</p>
                    <h4
                      className={`fw-bold ${studentData.percentage >= 40
                        ? "text-success"
                        : "text-danger"
                        }`}
                    >
                      {studentData.percentage.toFixed(2)}%
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentResult;
