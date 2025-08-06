import React, {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
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
import { toast } from "react-toastify";
import { getAllSubjects } from "../../services/Teacher/TeacherSubject";



function DisplayCourse() {
  const navigate = useNavigate();

  const [openSubjects, setOpenSubjects] = useState([]);

  useEffect(() => {
       const fetchSubjects = async () => {
         try {
           const data = await getAllSubjects();
           setOpenSubjects(data);
         } catch (error) {
           console.log(error)
           toast.error("Unable to load notices");
         }
       };
       fetchSubjects();
     }, []);

  // const [courseStatus, setCourseStatus] = useState(
  //   sampleCourses.reduce((acc, course) => {
  //     acc[course.id] = course.status;
  //     return acc;
  //   }, {})
  // );

  // const toggleStatus = (id) => {
  //   setCourseStatus((prev) => ({
  //     ...prev,
  //     [id]: !prev[id],
  //   }));
  // };

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! HAVE TO TAKE CARE OF THIS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const showSubjects = (course) => {
    navigate(`/admin/course/${course.id}/subjects`, {
      state: { course }, // pass course via navigation state
    });
  };

  return (
    <>
      <TeacherNavbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <TeacherSidebar />
          </div>
          <div className="col-7-5 admin-dashboard-second p-4">
            <div className="card p-4 shadow">
              <h3 className="fw-bold" style={{ color: "#4361e5" }}>
                Course List
              </h3>
              {openSubjects.map((course) => (
                <div
                  key={course.id}
                  className="mb-4 border rounded p-3 shadow-sm position-relative"
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
                        onClick={() => showSubjects(course)}
                      >
                        Show Subjects
                      </button>

                      <br />
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
