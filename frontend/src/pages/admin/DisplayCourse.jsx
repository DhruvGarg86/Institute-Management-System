import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Filter,
  ExcelExport,
  PdfExport,
  Toolbar,
  Print,
  Page,
  Search,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { FaEdit, FaTrash } from "react-icons/fa";

const sampleCourses = [
  {
    id: 1,
    name: "Full Stack Development",
    description: "Learn frontend and backend web development.",
    duration: "6 months",
    startDate: "2025-08-10",
    endDate: "2026-02-10",
    courseFees: 45000.0,
    maxStudents: 30,
    subjects: [
      { code: 101, name: "HTML", description: "Basics of HTML" },
      { code: 102, name: "React", description: "Frontend using React" },
    ],
  },
  {
    id: 2,
    name: "Data Science",
    description: "Explore Python, ML, and Data Visualization.",
    duration: "4 months",
    startDate: "2025-09-01",
    endDate: "2026-01-01",
    courseFees: 60000.0,
    maxStudents: 25,
    subjects: [
      { code: 201, name: "Python", description: "Python basics" },
      { code: 202, name: "ML", description: "Intro to Machine Learning" },
    ],
  },
];

function DisplayCourse() {
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const [openSubjects, setOpenSubjects] = useState({});

  const toggleSubjects = (courseId) => {
    setOpenSubjects((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
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
              <h3 className="fw-bold" style={{ color: "#4361e5" }}>
                Course List
              </h3>
              {sampleCourses.map((course) => (
                <div
                  key={course.id}
                  className="mb-4 border rounded p-3 shadow-sm"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{course.name}</h5>
                      <p>{course.description}</p>
                      <p>
                        <strong>Duration:</strong> {course.duration}
                      </p>
                      <p>
                        <strong>Start:</strong> {course.startDate} &nbsp;{" "}
                        <strong>End:</strong> {course.endDate}
                      </p>
                      <p>
                        <strong>Fees:</strong> ₹{course.courseFees} &nbsp;{" "}
                        <strong>Max Students:</strong> {course.maxStudents}
                      </p>
                    </div>
                    <div>
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => toggleSubjects(course.id)}
                      >
                        {openSubjects[course.id]
                          ? "Hide Subjects"
                          : "Show Subjects"}
                      </button>
                      <br />
                      <button
                        className="btn btn-sm btn-light mt-2 text-primary"
                        onClick={() =>
                          navigate(`/admin/edit-course/${course.id}`)
                        }
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-light mt-2 ms-2 text-danger"
                        onClick={() => console.log("Delete course:", course.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {openSubjects[course.id] && (
                    <div className="mt-3 ps-3">
                      <h6>Subjects:</h6>
                      <ul>
                        {course.subjects.map((sub) => (
                          <li key={sub.code}>
                            <strong>{sub.name}</strong>: {sub.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayCourse;
