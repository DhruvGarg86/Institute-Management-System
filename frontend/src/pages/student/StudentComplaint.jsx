import React, { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar";
import StudentNavbar from "../../pages/student/StudentNavbar";
import Footer from "../../components/Footer";

function StudentComplaint() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Dummy data for the logged-in student
    const dummyComplaints = [
      {
        id: 1,
        description: "Fan not working in classroom.",
        status: "ACTIVE",
      },
      {
        id: 2,
        description: "Broken desk in lab.",
        status: "RESOLVED",
      },
      {
        id: 3,
        description: "Projector not functioning in Seminar Hall.",
        status: "ACTIVE",
      },
      {
        id: 4,
        description: "Wi-Fi connectivity issues in library.",
        status: "RESOLVED",
      },
      {
        id: 5,
        description: "Lights flickering in corridor.",
        status: "ACTIVE",
      },
      {
        id: 6,
        description: "Computer not turning on in Lab 3.",
        status: "RESOLVED",
      },
    ];

    setComplaints(dummyComplaints);
  }, []);

  return (
    <>
      <StudentNavbar />

      <div className="d-flex vh-100 bg-light text-dark mt-2">
        {/* Sidebar */}
        <div className="d-none d-md-flex col-2 bg-white px-2 flex-column">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <main className="col-12 col-md-10 d-flex flex-column p-3 overflow-auto">
          <h4 className="mb-3">Your Complaints</h4>

          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            <div className="row">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100 shadow-sm border-primary">
                    <div className="card-body">
                      <h5 className="card-title text-primary">
                        Complaint #{complaint.id}
                      </h5>
                      <p className="card-text mb-2">{complaint.description}</p>
                      <span
                        className={`badge ${
                          complaint.status === "RESOLVED"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default StudentComplaint;
