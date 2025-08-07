import React, { useEffect, useState } from "react";
import axios from "axios";
import NoticeList from "../../components/Notices/NoticeList";
import StudentSidebar from "./StudentSidebar";
import StudentAttendanceCard from "../../pages/student/StudentAttendanceCard";
import StudentMarksCard from "../../pages/student/StudentMarksCard";
import StudentNavbar from "../../pages/student/StudentNavbar";
import { config } from "../../services/config";

function StudentDashboard() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(`${config.serverUrl}/student/notices`);
        setNotices(res.data);
      } catch (err) {
        console.error("Failed to fetch notices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  return (
    <>
      <StudentNavbar />

      <div className="d-flex vh-100 flex-column">
        <div className="d-flex flex-grow-1">
          {/* Sidebar */}
          <aside className="d-none d-md-block col-md-2 bg-white p-3 border-end">
            <StudentSidebar />
          </aside>

          {/* Main Content */}
          <main className="col-12 col-md-10 p-3 overflow-auto bg-light">
            <div className="row g-3">
              {/* Notice Board */}
              <section className="col-12 col-lg-7">
                <div className="bg-white p-4 rounded shadow-sm h-100 d-flex flex-column">
                  <h2 className="fs-5 fw-semibold mb-3 text-primary">
                    Notice Board
                  </h2>
                  <div className="overflow-auto flex-grow-1">
                    {loading ? (
                      <p>Loading notices...</p>
                    ) : (
                      <NoticeList notices={notices} />
                    )}
                  </div>
                </div>
              </section>

              {/* Attendance & Marks */}
              <section className="col-12 col-lg-5 d-flex flex-column gap-3">
                <div className="bg-white p-4 rounded shadow-sm flex-grow-1 d-flex flex-column">
                  <h2 className="fs-5 fw-semibold mb-3 text-success">
                    Attendance
                  </h2>
                  <div className="d-flex justify-content-center align-items-center flex-grow-1">
                    <StudentAttendanceCard />
                  </div>
                </div>

                <div className="bg-white p-4 rounded shadow-sm flex-grow-1 d-flex flex-column">
                  <h2 className="fs-5 fw-semibold mb-3 text-info">
                    Student Marks
                  </h2>
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
