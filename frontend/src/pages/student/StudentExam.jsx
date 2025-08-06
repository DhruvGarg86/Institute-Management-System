import React from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import Footer from "../../components/Footer";

function StudentExam() {
  // Dummy student marks data
  const studentData = {
    studentName: "Shreyansh Bhardwaj",
    courseId: 101,
    courseName: "PG-DAC",
    subjectMarks: [
      { subjectName: "Math", marksObtained: 85, maxMarks: 100 },
      { subjectName: "Science", marksObtained: 90, maxMarks: 100 },
      { subjectName: "English", marksObtained: 78, maxMarks: 100 },
      { subjectName: "History", marksObtained: 70, maxMarks: 100 },
    ],
    totalMarksObtained: 323,
    totalMarks: 400,
    percentage: 80.75,
  };

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
                      subject.marksObtained >= subject.maxMarks * 0.4
                        ? "Pass"
                        : "Fail";

                    return (
                      <tr key={index}>
                        <td>{subject.subjectName}</td>
                        <td>{subject.marksObtained}</td>
                        <td>{subject.maxMarks}</td>
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
                  <h5>{studentData.percentage}%</h5>
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
