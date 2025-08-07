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
      return decoded.id; // adjust based on your token structure
    } catch (e) {
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
          `http://localhost:8080/student/notice/${studentId}`
        );
        setComplaints(response.data);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
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
        <div className="d-none d-md-flex col-2 bg-white px-2 flex-column">
          <StudentSidebar />
        </div>

        {/* Main Content */}
        <main className="col-12 col-md-10 d-flex flex-column p-3 overflow-auto">
          <h4 className="mb-3">Your Complaints</h4>

          {error && <p className="text-danger">{error}</p>}

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
