import React, { useEffect, useState } from "react";
import StudentNavbar from "./StudentNavbar"; // adjust path if needed
import StudentSidebar from "../../components/Sidebar/StudentSidebar"; // adjust path if needed

function StudentFee() {
  const [fee, setFee] = useState(null);

  useEffect(() => {
    const dummyFeeData = {
      id: 1,
      rollNo: "101",
      course: "DAC",
      name: "Vedant Choudhari",
      amount: 10000,
      amountPaid: 3000,
      DueDate: "2025-07-20",
    };

    const remainingAmount = dummyFeeData.amount - dummyFeeData.amountPaid;

    let status = "Pending";
    if (dummyFeeData.amountPaid === 0) status = "Unpaid";
    else if (remainingAmount === 0) status = "Paid";

    setFee({ ...dummyFeeData, remainingAmount, status });
    // Calculate remaining amount and fee status

  }, []);
  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2-5">
            <StudentSidebar />
          </div>
          <div className="col-7-5">
            <h2 className="mb-4 student-center">Fee Details</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Roll No.</th>
                    <th>Course</th>
                    <th>Name</th>
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
                      <td>{fee.rollNo}</td>
                      <td>{fee.course}</td>
                      <td>{fee.name}</td>
                      <td>₹{fee.amount}</td>
                      <td>₹{fee.amountPaid}</td>
                      <td>₹{fee.remainingAmount}</td>
                      <td>{fee.DueDate}</td>
                      <td>
                        <span
                          className={`badge ${
                            fee.status === "Paid"
                              ? "bg-success"
                              : fee.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {fee.status}
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
