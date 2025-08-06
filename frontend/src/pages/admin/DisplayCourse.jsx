import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { deleteCourseById, getAllCourses } from "../../services/Admin/Course";

function DisplayCourse() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [courseStatus, setCourseStatus] = useState({});

  const getCourses = async () => {
    try {
      const response = await getAllCourses();
      setCourses(response);

      const statusMap = response.reduce((acc, course) => {
        acc[course.id] = course.status === "ACTIVE";
        return acc;
      }, {});
      setCourseStatus(statusMap);
      toast.success("Courses loaded successfully");
    } catch (error) {
      console.log(error);
      toast.error("Unable to get courses");
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  const toggleStatus = (id) => {
    setCourseStatus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const showSubjects = (course) => {
    navigate(`/admin/course/${course.id}/subjects`, {
      state: { course },
    });
  };

  const deleteCourse = async (id) => {
    try {
      await deleteCourseById(id);
      getCourses();
      toast.success("Course deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
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
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="mb-4 border rounded p-3 shadow-sm position-relative"
                >
                  <div className="position-absolute top-0 end-0 mt-2 me-2">
                    <div className="form-check form-switch">
                      <span>Active</span>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`statusSwitch${course.id}`}
                        checked={courseStatus[course.id]}
                        onChange={() => toggleStatus(course.id)}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5>{course.name}</h5>
                      <p>{course.description}</p>
                      <p>
                        <strong>Duration:</strong> {course.duration} months
                      </p>
                      <p>
                        <strong>Start:</strong> {course.startDate} &nbsp;
                        <strong>End:</strong> {course.endDate}
                      </p>
                      <p>
                        <strong>Fees:</strong> ₹{course.courseFees} &nbsp;
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
                        onClick={() => deleteCourse(course.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 ps-3">
                    {/* <h6>Subject-Teacher Assignments:</h6> */}
                    <ul>
                      {course.courseSubjectTeachers?.map((item, index) => (
                        <li key={index}>
                          Subject ID: <strong>{item.subjectId}</strong>, Teacher ID:{" "}
                          <strong>{item.teacherId}</strong>
                        </li>
                      ))}
                    </ul>
                  </div>
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
