import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import { getUserIdFromToken } from "../../services/Student/auth";
import { getStudentMarks } from "../../services/Student/StudentMarks";

function StudentExam() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const studentId = getUserIdFromToken();
    if (!studentId) {
      console.error("Student ID not found from token.");
      return;
    }

    getStudentMarks(studentId)
      .then((data) => {
        setStudentData(data.data); // Ensure you access `.data` if backend wraps the response
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading student marks:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!studentData)
    return <p className="text-center text-danger">No data available</p>;

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>
          <div className="col-10">
            <h2 className="mb-4 student-center">Exam Result</h2>
            <div className="mb-3">
              <p>
                <strong>Student Name:</strong> {studentData.studentName}
              </p>
              <p>
                <strong>Course:</strong> {studentData.courseName}
              </p>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
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
                            className={`badge ${
                              status === "Pass" ? "bg-success" : "bg-danger"
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

            <div className="row mt-4">
              <div className="col-md-4">
                <div className="card p-3 text-center">
                  <p className="mb-1 text-muted">Marks Obtained</p>
                  <h5>{studentData.totalMarksObtained}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center">
                  <p className="mb-1 text-muted">Total Marks</p>
                  <h5>{studentData.totalMarks}</h5>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card p-3 text-center">
                  <p className="mb-1 text-muted">Percentage</p>
                  <h5>{studentData.percentage.toFixed(2)}%</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentExam;
