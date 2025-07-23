import React from 'react';

function StudentAttendance() {
  // Sample data for one student across multiple days
  const attendanceData = [
    { date: '2025-07-01', status: 'Present' },
    { date: '2025-07-02', status: 'Absent' },
    { date: '2025-07-03', status: 'Present' },
    { date: '2025-07-04', status: 'Present' },
    { date: '2025-07-05', status: 'Absent' },
    { date: '2025-07-06', status: 'Present' },
    { date: '2025-07-07', status: 'Present' },
    { date: '2025-07-08', status: 'Absent' },
    { date: '2025-07-09', status: 'Present' },
    { date: '2025-07-10', status: 'Present' }
  ];

  const student = {
    rollNo: '101',
    name: 'Vedant Choudhari',
    course: 'DAC'
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4">Student Attendance</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry, index) => (
              <tr key={index}>
                <td>{student.rollNo}</td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td>{entry.date}</td>
                <td>
                  <span className={`badge ${entry.status === 'Present' ? 'bg-success' : 'bg-danger'}`}>
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentAttendance;
