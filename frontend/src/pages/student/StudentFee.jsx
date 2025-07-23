import React, { useState } from 'react';
function StudentFee() {
  const [files, setFiles] = useState({});

  const students = [
    {
      id: 1,
      rollNo: '1',
      course: 'DAC',
      name: 'Vedant Choudhari',
      amount: '10000',
      issuedOn: '10/05/2025',
      status: 'Pending',
    },
    {
      id: 2,
      rollNo: '2',
      course: 'DBDA',
      name: 'Sara Ali',
      amount: '12000',
      issuedOn: '11/06/2025',
      status: 'Paid',
    }
    // Add more students as needed
  ];

  const handleFileChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [id]: file }));
      console.log(`File selected for ID ${id}:`, file.name);
    }
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4 " >Student Fees</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
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
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.rollNo}</td>
                <td>{student.course}</td>
                <td>{student.name}</td>
                <td>₹{student.amount}</td>
                <td>{student.issuedOn}</td>
                <td>{student.status}</td>
                <td>
                  <label className="btn btn-sm btn-primary mb-0">
                    Upload
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={e => handleFileChange(e, student.id)}
                    />
                  </label>
                  {files[student.id] && (
                    <span className="text-success ms-2">
                      ✔️ {files[student.id].name}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentFee;
