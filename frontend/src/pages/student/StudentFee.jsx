import React, { useEffect, useState } from "react";
import StudentSidebar from "../../components/Sidebar/StudentSidebar";
import Navbar from "../../components/Navbar";
import StudentNavbar from "./StudentNavbar";

function StudentFee() {
  const [fee, setFee] = useState(null);
  const [file, setFile] = useState(null);

  // Dummy data simulating fetched API data
  useEffect(() => {
    const dummyFeeData = {
      id: 1,
      rollNo: "101",
      course: "DAC",
      name: "Vedant Choudhari",
      amount: "10000",
      issuedOn: "2025-07-20", // YYYY-MM-DD
      status: "Pending",
    };

    // Validate issued date
    if (new Date(dummyFeeData.issuedOn) > new Date()) {
      alert("Issued date cannot be in the future!");
    } else {
      setFee(dummyFeeData);
    }
  }, []);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      const maxSizeMB = 10;

      if (!allowedTypes.includes(selected.type)) {
        alert("Only JPG, JPEG, PNG, or PDF files are allowed!");
        return;
      }

      if (selected.size > maxSizeMB * 1024 * 1024) {
        alert("File size must be less than 10MB!");
        return;
      }

      setFile(selected);
      console.log("Selected file:", selected.name);
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-2-5">
            <StudentSidebar />
          </div>
          <div className="col-7-5">
            <h2 className="mb-4">Student Fee Details</h2>
            <div className="table-responsive">
              <table className="table table-bordered table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>Roll No.</th>
                    <th>Course</th>
                    <th>Name</th>
                    <th>Total Amount</th>
                    <th>Issued On</th>
                    <th>Status</th>
                    <th>Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {fee ? (
                    <tr>
                      <td>{fee.rollNo}</td>
                      <td>{fee.course}</td>
                      <td>{fee.name}</td>
                      <td>₹{fee.amount}</td>
                      <td>{fee.issuedOn}</td>
                      <td>{fee.status}</td>
                      <td>
                        <label className="btn btn-sm btn-primary mb-0">
                          Upload
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </label>
                        {file && (
                          <span className="text-success ms-2">
                            ✔️ {file.name}
                          </span>
                        )}
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
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
