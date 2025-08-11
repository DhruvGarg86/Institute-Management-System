import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";
import { getUserIdFromToken } from "../../services/Student/StudentService";
import {
  FaUser,
  FaEnvelope,
  FaBook,
  FaRupeeSign,
  FaCalendarAlt,
} from "react-icons/fa";

function StudentFee() {
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const studentId = getUserIdFromToken();

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!studentId || !token) {
          // console.error("Missing student ID or token.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/student/fee/${studentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data;
        const remainingAmount = data.totalAmount - data.amountPaid;
        let statusText = "Pending";
        if (data.amountPaid === 0) statusText = "Unpaid";
        else if (remainingAmount === 0) statusText = "Paid";

        setFee({ ...data, remainingAmount, statusText });
      } catch (error) {
        // console.error("Error fetching fee details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeDetails();
  }, [studentId]);

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>

          {/* Main Content */}
          <div className="col-10 d-flex justify-content-center">
            <div style={{ width: "100%", maxWidth: "800px" }}>
              <h2 className="mb-4 text-center fw-bold text-primary">
                <FaRupeeSign className="me-2" /> Fee Details
              </h2>

              {loading ? (
                <div className="text-center py-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>
                  <p className="mt-2 text-muted">Loading Fee Details...</p>
                </div>
              ) : fee ? (
                <div className="card shadow border-0 rounded-4 p-4 bg-light">
                  <div className="card-body">
                    <div className="row g-4">
                      <InfoItem
                        icon={<FaUser />}
                        label="Student Name"
                        value={fee.studentName}
                      />
                      <InfoItem
                        icon={<FaEnvelope />}
                        label="Email"
                        value={fee.email}
                      />
                      <InfoItem
                        icon={<FaBook />}
                        label="Course"
                        value={fee.courseName}
                      />
                      <InfoItem
                        icon={<FaRupeeSign />}
                        label="Total Amount"
                        value={`₹${fee.totalAmount}`}
                      />
                      <InfoItem
                        icon={<FaRupeeSign />}
                        label="Amount Paid"
                        value={`₹${fee.amountPaid}`}
                        valueClass="text-success"
                      />
                      <InfoItem
                        icon={<FaRupeeSign />}
                        label="Remaining"
                        value={`₹${fee.remainingAmount}`}
                        valueClass={
                          fee.remainingAmount > 0
                            ? "text-danger fw-bold"
                            : "text-success fw-bold"
                        }
                      />
                      <InfoItem
                        icon={<FaCalendarAlt />}
                        label="Due Date"
                        value={formatDate(fee.dueDate)}
                      />
                      {/* Status */}
                      <div className="col-md-6">
                        <h5 className="text-primary mb-1">Status</h5>
                        <span
                          className={`badge fs-6 px-3 py-2 shadow-sm ${
                            fee.statusText === "Paid"
                              ? "bg-success"
                              : fee.statusText === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                          style={{ borderRadius: "12px" }}
                        >
                          {fee.statusText}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="card shadow-sm border-0 rounded-4 p-4 text-center bg-light">
                  <p className="text-muted mb-0">No fee record available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function InfoItem({ icon, label, value, valueClass }) {
  return (
    <div className="col-md-6">
      <h5 className="text-primary mb-1">
        {icon} <span className="ms-1">{label}</span>
      </h5>
      <p className={`fw-semibold ${valueClass || ""}`}>{value}</p>
    </div>
  );
}

export default StudentFee;
