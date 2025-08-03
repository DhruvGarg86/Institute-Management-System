import React from "react";
import NoticeList from "../../components/Notices/NoticeList";
import notices from "../../data/notices";
import StudentSidebar from "../../components/StudentSidebar";
import StudentAttendanceCard from "../../pages/student/StudentAttendanceCard";
import StudentMarksCard from "../../pages/student/StudentMarksCard";
import StudentNavbar from "../../pages/student/StudentNavbar";
import Footer from "../../components/Footer";

function StudentComplaint() {
  return (
    <>
      <StudentNavbar />

      <div className="d-flex vh-100 bg-light text-dark mt-4">
        {/* Sidebar - Left Section */}
        {/* Using a 2-column layout for the sidebar, responsive on medium screens and up */}
        <div className="d-none d-md-flex col-2 bg-white px-2 flex-column">
          <div className="flex-grow-1">
            <StudentSidebar />
          </div>
        </div>

        {/* Main Content - Right Section */}
        <main className="col-12 col-md-10 d-flex flex-column p-2 overflow-auto">
          <div className="d-flex flex-grow-1 flex-column flex-md-row">
            {/* Left Column (Notice Board) */}
            <div className="col-12 col-md-7 bg-white p-2 rounded-4 shadow d-flex flex-column my-2">
              <h2 className="fs-4 fw-semibold mb-4">Notice Board</h2>
              <div className="flex-grow-1 overflow-y-scroll">
                {notices && <NoticeList notices={notices} />}
              </div>
            </div>

            {/* Right Column (Charts) */}
            <div className="col-12 col-md-5 d-flex flex-column p-2">
              {/* Upper Component (Attendance Pie Chart) */}
              <div className="flex-grow-1 bg-white p-4 rounded-4 shadow d-flex flex-column mb-3">
                <h2 className="fs-4 fw-semibold">Attendance</h2>
                <div className="flex-grow-1 d-flex w-100 align-items-center justify-content-center">
                  <StudentAttendanceCard />
                </div>
              </div>

              {/* Lower Component (Student Marks Bar Graph) */}
              <div className="flex-grow-1 bg-white p-4 rounded-4 shadow d-flex flex-column">
                <h2 className="fs-4 fw-semibold mb-4">Student Marks</h2>
                <div className="flex-grow-1 d-flex w-100 align-items-center justify-content-center">
                  <StudentMarksCard />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default StudentComplaint;
