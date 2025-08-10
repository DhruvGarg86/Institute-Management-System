import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentSidebar from "./StudentSidebar";
import StudentNavbar from "../../pages/student/StudentNavbar";

function StudentComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  const getStudentIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      return decoded.id;
    } catch (e) {
      // console.log(e);
      return null;
    }
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      const studentId = getStudentIdFromToken();
      if (!studentId) {
        setError("Invalid token or not logged in.");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/student/complaints/${studentId}`
        );
        setComplaints(response.data);
      } catch (err) {
        // console.error("Failed to fetch complaints:", err);
        setError("Failed to fetch complaints.");
      }
    };

    fetchComplaints();
  }, []);

  return (
    <>
      <StudentNavbar />

      <div className="d-flex vh-100 bg-light text-dark mt-2">
        {/* Sidebar */}
        <div className="d-none d-md-flex col-2 bg-white px-2 flex-column shadow-sm">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <main className="col-12 col-md-10 p-4 overflow-auto">
          <h4 className="fw-bold text-primary mb-4">
            <i className="bi bi-chat-dots-fill me-2"></i> Your Complaints
          </h4>

          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}

          {complaints.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="bi bi-inbox fs-1 mb-2 d-block"></i>
              No complaints found.
            </div>
          ) : (
            <div className="row g-4">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="col-md-6 col-lg-4">
                  <div className="card h-100 shadow-sm border-0 rounded-4 complaint-card">
                    <div className="card-body">
                      <h5 className="card-title text-primary fw-bold mb-2">
                        Complaint #{complaint.id}
                      </h5>
                      <p className="card-text text-muted mb-3">
                        {complaint.description}
                      </p>
                      <span
                        className={`badge px-3 py-2 rounded-pill ${complaint.status === "RESOLVED"
                            ? "bg-success"
                            : "bg-warning text-dark"
                          }`}
                        style={{ fontSize: "0.85rem" }}
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

      <style>{`
        .complaint-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .complaint-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.08);
        }
      `}</style>
    </>
  );
}

export default StudentComplaint;
