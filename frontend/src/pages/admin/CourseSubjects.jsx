// src/pages/admin/CourseSubjects.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

function CourseSubjects() {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};

  if (!course) {
    return (
      <div className="p-4">
        <p>No course data provided.</p>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  // Dummy mapping: subject code → teachers (replace with backend call later)
  const subjectTeachersMap = {
    101: ["Alice", "Bob"],
    102: ["Charlie"],
    201: ["Dave", "Eve"],
    202: ["Frank"],
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <Sidebar />
          </div>
          <div className="col-7-5 admin-dashboard-second p-4">
            <div className="card p-4 shadow">
              <h3 className="fw-bold text-primary mb-3">
                Subjects for: {course.name}
              </h3>
              {course.subjects.map((sub) => (
                <div
                  key={sub.code}
                  className="mb-3 p-3 border rounded shadow-sm"
                >
                  <h5>{sub.name}</h5>
                  <p>{sub.description}</p>
                  <p>
                    <strong>Teachers:</strong>{" "}
                    {(subjectTeachersMap[sub.code] || []).join(", ")}
                  </p>
                </div>
              ))}
              <button
                className="btn btn-secondary mt-3"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseSubjects;
