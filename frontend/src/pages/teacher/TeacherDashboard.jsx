import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import Card from "../../components/Card";
import TeacherSidebar from "./TeacherSidebar";
import TeacherNavbar from "./TeacherNavbar";
import {
  getAllNotices,
  getTeacherTotalAttendance,
  getTeacherTotalCourses,
  getTotalStudents,
  getUserIdFromToken,
} from "../../services/Teacher/Dashboard";
import { toast } from "react-toastify";


function TeacherDashboard() {
  const [totalStudent, setTotalStudent] = useState("");
  const [totalTeacherAttendance, setTotalTeacherAttendance] = useState({
    presentDays: "",
    totalWorkingDays: "",
  });
  const [totalCourses, setTotalCourses] = useState("");
  const [notice, setNotice] = useState([]);

  const id = getUserIdFromToken();
  console.log(id);

  // get total students
  useEffect(() => {
    const fetchStudents = async (id) => {
      try {
        const response = await getTotalStudents(id);
        setTotalStudent(response);
      } catch (error) {
        console.log(error);
        toast.error("Unable to load total students");
      }
    };
    fetchStudents(id);
  }, []);

  // get teacher's attendance
  // useEffect(() => {
  //   const fetchAttendance = async (id) => {
  //     try {
  //       const response = await getTeacherTotalAttendance(id);
  //       console.log("IN FETCH ATTENDANCE" + response);
  //       setTotalTeacherAttendance(response);
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Unable to load total teacher");
  //     }
  //   };
  //   fetchAttendance(id);
  // }, [id]);

  const fetchAttendance = async (id) => {
    try {
      const response = await getTeacherTotalAttendance(id);
      console.log(response);
      setTotalTeacherAttendance(response);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load total teacher");
    }
  };

  useEffect(() => {
    fetchAttendance(id);
  }, [id]);


  const fetchCourses = async (id) => {
    try {
      console.log("in course" + id);
      const response = await getTeacherTotalCourses(id);
      setTotalCourses(response);
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load total teacher");
    }
  };

  useEffect(() => {
    if(id)
      fetchCourses(id);
  }, [id]);

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getAllNotices();
        setNotice(data);
      } catch (error) {
        console.log(error);
        toast.error("Unable to load notices");
      }
    };
    fetchNotices();
  }, []);

  return (
    <>
      <TeacherNavbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          <div className="col-2-5 admin-dashboard-first">
            <TeacherSidebar />
          </div>
          <div className="col-7-5 container-fluid admin-dashboard-second">
            <div className="row admin-dashboard-second-row1">
              <div className="col row1-first">
                <h3>
                  <FaUserGraduate style={{ marginRight: "10px" }} />
                  Total Students
                </h3>
                <div>
                  <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                    {totalStudent}
                  </h2>
                </div>
              </div>
              <div className="col row1-second">
                <h3>
                  <FaChalkboardTeacher style={{ marginRight: "10px" }} />
                  Your Attendance
                </h3>
                <div>
                  <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                    {totalTeacherAttendance.presentDays}/
                    {totalTeacherAttendance.totalWorkingDays}
                  </h2>
                </div>
              </div>
              <div className="col row1-third">
                <h3>
                  <MdMenuBook style={{ marginRight: "10px" }} />
                  Your Courses
                </h3>
                <div>
                  <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                    {totalCourses}
                  </h2>
                </div>
              </div>
            </div>

            <div className="row admin-dashboard-second-row2">
              <div className="col-8 row2-first">
                <div className="row2-first-inner-div">
                  <h2
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginBottom: "20px",
                      color: "black",
                    }}
                  >
                    Top Student
                  </h2>
                  <div className="row2-first-inner-div-profile">
                    <Card />
                  </div>
                </div>
              </div>
              <div className="col-4 row2-second">
                <div className="row2-first-inner-div">
                  <h3
                    className="row2-second-notice"
                    style={{ fontWeight: "bold" }}
                  >
                    Notices
                  </h3>
                  {notice.length > 0 ? (
                    notice.map((n) => (
                      <a
                        href="/teacher/display-notice"
                        className="admin-dashboard-notice-link"
                        key={n.id}
                      >
                        <div className="row2-second-notice-item">
                          <p
                            style={{
                              fontSize: "1rem",
                              marginBottom: "0px",
                              fontWeight: "bold",
                            }}
                            dangerouslySetInnerHTML={{ __html: n.title }}
                          />
                          <p style={{ marginBottom: "20px" }}>{n.date}</p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <p style={{ textAlign: "center", color: "gray" }}>
                      No notices available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TeacherDashboard;
