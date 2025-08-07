import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar";
import StudentSidebar from "./StudentSidebar";
import axios from "axios";

function StudentFee() {
  const [fee, setFee] = useState(null);

  useEffect(() => {
    const fetchFeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const studentId = localStorage.getItem("studentId");

        if (!studentId || !token) {
          console.error("Missing student ID or token.");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/student/fee/${studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;

        const remainingAmount = data.totalAmount - data.amountPaid;

        let statusText = "Pending";
        if (data.amountPaid === 0) statusText = "Unpaid";
        else if (remainingAmount === 0) statusText = "Paid";

        setFee({ ...data, remainingAmount, statusText });
      } catch (error) {
        console.error("Error fetching fee details:", error);
      }
    };

    fetchFeeDetails();
  }, []);

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-2 px-2">
            <StudentSidebar />
          </div>
          <div className="col-10">
            <h2 className="mb-4 student-center">Fee Details</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Total Amount</th>
                    <th>Amount Paid</th>
                    <th>Remaining</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {fee ? (
                    <tr>
                      <td>{fee.studentName}</td>
                      <td>{fee.email}</td>
                      <td>{fee.courseName}</td>
                      <td>₹{fee.totalAmount}</td>
                      <td>₹{fee.amountPaid}</td>
                      <td>₹{fee.remainingAmount}</td>
                      <td>{fee.dueDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            fee.statusText === "Paid"
                              ? "bg-success"
                              : fee.statusText === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {fee.statusText}
                        </span>
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center text-muted">
                        No fee record available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentFee;
