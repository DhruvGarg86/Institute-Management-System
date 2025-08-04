import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import Card from "../../components/Card";
import { toast } from "react-toastify";
import {
  getAllNotices,
  getTopStudent,
  getTotalCourses,
  getTotalStudents,
  getTotalTeachers,
} from "../../services/Admin/Dashboard";

function Dashboard() {
  const [tstudent, setTstudent] = useState("");
  const [tteacher, setTteacher] = useState("");
  const [tcourse, setTcourse] = useState("");
  const [notice, setNotice] = useState([]); 
  const [topstudent, setTopstudent] = useState("");

  // Fetch Total Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getTotalStudents();
        setTstudent(response.count);
      } catch (error) {
        console.log(error)
        toast.error("Unable to load total students");
      }
    };
    fetchStudents();
  }, []);

  // Fetch Total Teachers
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getTotalTeachers();
        setTteacher(response.count);
      } catch (error) {
        console.log(error)
        toast.error("Unable to load total teachers");
      }
    };
    fetchTeachers();
  }, []);

  // Fetch Total Courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getTotalCourses();
        setTcourse(response.count);
      } catch (error) {
        console.log(error)
        toast.error("Unable to load total courses");
      }
    };
    fetchCourses();
  }, []);

  // Fetch Notices
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getAllNotices();
        setNotice(data);
      } catch (error) {
        console.log(error)
        toast.error("Unable to load notices");
      }
    };
    fetchNotices();
  }, []);

  // Fetch Top Student (future use)
  useEffect(() => {
    const fetchTopStudent = async () => {
      try {
        const data = await getTopStudent();
        setTopstudent(data);
      } catch (error) {
        console.log(error)
        toast.error("Unable to load top student");
      }
    };
    fetchTopStudent();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid admin-dashboard-container">
        <div className="row admin-dashboard-row">
          {/* Sidebar */}
          <div className="col-2-5 admin-dashboard-first">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-7-5 container-fluid admin-dashboard-second">
            <div className="row admin-dashboard-second-row1">

              {/* Total Students, Teachers, Courses */}
              <div className="col row1-first">
                <h3>
                  <FaUserGraduate style={{ marginRight: "10px" }} /> Total Students
                </h3>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{tstudent}</h2>
              </div>

              <div className="col row1-second">
                <h3>
                  <FaChalkboardTeacher style={{ marginRight: "10px" }} /> Total Teachers
                </h3>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{tteacher}</h2>
              </div>

              <div className="col row1-third">
                <h3>
                  <MdMenuBook style={{ marginRight: "10px" }} /> Total Courses
                </h3>
                <h2 style={{ fontWeight: "bold", textAlign: "center" }}>{tcourse}</h2>
              </div>
            </div>

            {/* Row 2: Top Student + Notices */}
            <div className="row admin-dashboard-second-row2">

              {/* Top Student */}
              <div className="col-8 row2-first">
                <div className="row2-first-inner-div">
                  <h2 style={{ fontWeight: "bold", textAlign: "center", marginBottom: "20px", color: "black" }}>
                    Top Student
                  </h2>
                  <div className="row2-first-inner-div-profile">
                    <Card />
                  </div>
                </div>
              </div>

              {/* Notices */}
              <div className="col-4 row2-second">
                <div className="row2-first-inner-div">
                  <h3 className="row2-second-notice" style={{ fontWeight: "bold" }}>
                    Notices
                  </h3>
                  {notice.length > 0 ? (
                    notice.map((n) => (
                      <a
                        href="/admin/display-notices"
                        className="admin-dashboard-notice-link"
                        key={n.id}
                      >
                        <div className="row2-second-notice-item">
                          <p style={{ fontWeight: "bold", marginBottom: "-2px" }}>{n.date}</p>
                          <p
                            style={{ fontSize: "0.9rem", marginBottom: "20px" }}
                            dangerouslySetInnerHTML={{ __html: n.description }}
                          />
                        </div>
                      </a>
                    ))
                  ) : (
                    <p style={{ textAlign: "center", color: "gray" }}>No notices available</p>
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

export default Dashboard;
