import React from "react";
import NoticeList from "../../components/Notices/NoticeList";
import notices from "../../data/notices";
import StudentSidebar from "./StudentSidebar";
import StudentAttendanceCard from "../../pages/student/StudentAttendanceCard";
import StudentMarksCard from "../../pages/student/StudentMarksCard";
import StudentNavbar from "../../pages/student/StudentNavbar";
import "./Student-module.css";

function StudentDashboard() {
  return (
    <>
      <StudentNavbar />

      <div className="d-flex vh-100 flex-column">
        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <aside className="d-none d-md-block col-md-2 bg-white p-2 border-end">
            <StudentSidebar />
          </aside>

          {/* Main Content */}
          <main className="col-12 col-md-10 p-3 overflow-auto bg-light">
            <div className="row g-3">
              {/* Notice Board */}
              <section className="col-12 col-lg-7">
                <div className="bg-white p-4 rounded-4 shadow h-100 d-flex flex-column">
                  <h2 className="fs-4 fw-semibold mb-3">Notice Board</h2>
                  <div className="overflow-auto flex-grow-1">
                    {notices && <NoticeList notices={notices} />}
                  </div>
                </div>
              </section>

              {/* Attendance & Marks */}
              <section className="col-12 col-lg-5 d-flex flex-column gap-3">
                <div className="bg-white p-4 rounded-4 shadow flex-grow-1 d-flex flex-column">
                  <h2 className="fs-4 fw-semibold mb-3">Attendance</h2>
                  <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <StudentAttendanceCard />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-4 shadow flex-grow-1 d-flex flex-column">
                  <h2 className="fs-4 fw-semibold mb-3">Student Marks</h2>
                  <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <StudentMarksCard />
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
