import React from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "../../components/StudentSidebar";
import Footer from "../../components/Footer";

function StudentExam() {
  // Dummy data
  const timetable = [
    { day: "Monday", subject: "Java", time: "2:00 PM - 3:00 PM" },
    { day: "Monday", subject: "DSA", time: "3:15 PM - 4:15 PM" },
    { day: "Monday", subject: "DBMS", time: "4:30 PM - 5:30 PM" },
  ];

  const upcomingExams = [
    
    { subject: "Core Java", date: "2025-08-05", time: "10:00 AM" },
    { subject: "DSA", date: "2025-08-07", time: "1:00 PM" },
  ];

  const pastResults = [
    { subject: "Web Tech", score: "85", grade: "A" },
    { subject: "DBMS", score: "78", grade: "B+" },
  ];

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>
          <div className="col-10">
            <h2 className="text-center mt-4">Exam Dashboard</h2>

            {/* Timetable Section */}
            <div className="card shadow p-4 my-3">
              <h4 className="mb-3">Timetable</h4>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Day</th>
                    <th>Subject</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timetable.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.day}</td>
                      <td>{item.subject}</td>
                      <td>{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Upcoming Exams Section */}
            <div className="card shadow p-4 my-3">
              <h4 className="mb-3">Upcoming Exams</h4>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th>Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingExams.map((exam, idx) => (
                    <tr key={idx}>
                      <td>{exam.subject}</td>
                      <td>{exam.date}</td>
                      <td>{exam.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Past Results Section */}
            <div className="card shadow p-4 my-3">
              <h4 className="mb-3">Past Results</h4>
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {pastResults.map((result, idx) => (
                    <tr key={idx}>
                      <td>{result.subject}</td>
                      <td>{result.score}</td>
                      <td>{result.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StudentExam
