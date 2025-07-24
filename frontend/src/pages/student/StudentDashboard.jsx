import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import NoticeList from "../../components/Notices/NoticeList";
import notices from "../../data/notices";
import StudentSidebar from "../../components/Sidebar/StudentSidebar";

function StudentDashboard() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <StudentSidebar />
          </div>

          <div className="col-9">
            <div className="row">
              <div className="col-7" style={{ maxHeight: "500px" }}>
                {notices && <NoticeList notices={notices} />}
              </div>

              <div className="pr-1 col-5 d-flex flex-column" style={{height: "600px", gap: "1rem"}}>
                <div className="card flex-fill" style={{backgroundColor: "#eaebef"}}>
                  <div className="card-body">
                    <h1 className="card-title">ATTENDENCE</h1>
                    <p className="card-text">
                      68%
                    </p>
                  </div>
                </div>

                <div className="card flex-fill" style={{backgroundColor: "#eaebef"}}>
                  <div className="card-body">
                    <h1 className="card-title">TOTAL MARKS</h1>
                    <p className="card-text">
                      300/400
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default StudentDashboard;
