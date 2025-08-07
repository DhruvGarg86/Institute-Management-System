import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";

import Home from "./pages/Home";

// ADMIN IMPORTSimport Login from './pages/admin/Login';
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import EditStudent from "./pages/admin/EditStudent";
import StudentMarks from "./pages/admin/StudentMarks";
import DisplayStudent from "./pages/admin/DisplayStudent";
import AddTeacher from "./pages/admin/AddTeacher";
import DisplayTeacher from "./pages/admin/DisplayTeacher";
import EditTeacher from "./pages/admin/EditTeacher";
import TeacherAttendance from "./pages/admin/TeacherAttendance";
import AddNotice from "./pages/admin/AddNotice";
import DisplayNotice from "./pages/admin/DisplayNotice";
import Profile from "./pages/admin/Profile";
import ProfileEdit from "./pages/admin/ProfileEdit";
import AddSubject from "./pages/admin/AddSubject";
import EditSubject from "./pages/admin/EditSubject";
import AddCourse from "./pages/admin/AddCourse";
import EditCourse from "./pages/admin/EditCourse";
import DisplayComplaint from "./pages/admin/DisplayComplaints";
import EditComplaint from "./pages/admin/EditComplaint";
import Login from "./pages/admin/Login";
import DisplayCourse from "./pages/admin/DisplayCourse";
import DisplaySubject from "./pages/admin/DisplaySubject";
import CourseSubjects from "./pages/admin/CourseSubjects";
import StudentFees from "./pages/admin/StudentFees";

// TEACHER IMPORTS
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherAddNotice from "./pages/teacher/TeacherAddNotice";
import TeacherDisplayNotice from "./pages/teacher/TeacherDisplayNotice";
import TeacherProfile from "./pages/teacher/TeacherProfile";
import TeacherDisplayStudent from "./pages/teacher/TeacherDisplayStudent";
import TeacherStudentAttendance from "./pages/teacher/TeacherStudentAttendance";
import TeacherStudentMarks from "./pages/teacher/TeacherStudentMarks";
import TeacherStudentMarksOverview from "./pages/teacher/TeacherStudentMarksOverview";
import TeacherDisplayTeacher from "./pages/teacher/TeacherDisplayTeacher";
import TeacherDisplayCourse from "./pages/teacher/TeacherDisplayCourse";
import CourseSubjectsPage from "./pages/teacher/CourseSubjectsPage";

// STUDENT IMPORTS
import StudentMarksOverview from "./pages/admin/StudentMarksOverview";
import StudentAttendance from "./pages/admin/StudentAttendance";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentFee from "./pages/student/StudentFee";
import Student_Attendance from "./pages/student/Student_Attendance";
import StudentExam from "./pages/student/StudentExam";
import Registration from "./pages/student/Registration";
import StudentComplaint from "./pages/student/StudentComplaint";
import TeacherProfileEdit from "./pages/teacher/TeacherProfileEdit";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* ****************************ADMIN ROUTES**********************************  */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile/:id" element={<Profile />} />
        <Route path="/admin/profile-edit/:id" element={<ProfileEdit />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/display-students" element={<DisplayStudent />} />
        <Route path="/admin/edit-student/:id" element={<EditStudent />} />
        <Route
          path="/admin/student-attendance"
          element={<StudentAttendance />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile" element={<Profile />} />

        <Route path="/register" element={<Registration />} />
        <Route path="/admin/add-student" element={<AddStudent />} />
        <Route path="/admin/display-students" element={<DisplayStudent />} />
        <Route path="/admin/edit-student/:id" element={<EditStudent />} />
        <Route
          path="/admin/student-attendance"
          element={<StudentAttendance />}
        />
        <Route path="/admin/student-marks" element={<StudentMarksOverview />} />
        <Route path="/admin/student-marks/:id" element={<StudentMarks />} />
        <Route path="/admin/student-fees" element={<StudentFees />} />
        <Route path="/admin/add-teacher" element={<AddTeacher />} />
        <Route path="/admin/display-teachers" element={<DisplayTeacher />} />
        <Route path="/admin/edit-teacher/:id" element={<EditTeacher />} />
        <Route
          path="/admin/teacher-attendance"
          element={<TeacherAttendance />}
        />
        <Route path="/admin/add-notice" element={<AddNotice />} />
        <Route path="/admin/display-notices" element={<DisplayNotice />} />
        <Route path="/admin/add-subject" element={<AddSubject />} />
        <Route path="/admin/display-subjects" element={<DisplaySubject />} />
        <Route path="/admin/edit-subject/:id" element={<EditSubject />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/display-courses" element={<DisplayCourse />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route path="/admin/add-notice" element={<AddNotice />} />
        <Route path="/admin/display-notices" element={<DisplayNotice />} />
        <Route path="/admin/add-subject" element={<AddSubject />} />
        <Route path="/admin/edit-subject/:id" element={<EditSubject />} />
        <Route path="/admin/add-course" element={<AddCourse />} />
        <Route path="/admin/edit-course/:id" element={<EditCourse />} />
        <Route
          path="/admin/display-complaints"
          element={<DisplayComplaint />}
        />
        <Route path="/admin/edit-complaint/:id" element={<EditComplaint />} />
        <Route
          path="/admin/display-complaints"
          element={<DisplayComplaint />}
        />
        <Route path="/admin/course/:id/subjects" element={<CourseSubjects />} />

        <Route path="/admin/edit-complaint/:id" element={<EditComplaint />} />

        {/* ****************************TEACHER ROUTES**********************************  */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/profile" element={<TeacherProfile />} />
        <Route path="/teacher/profile/:id" element={<TeacherProfile />} />

        <Route path="/teacher/profile/edit/:id" element={<TeacherProfileEdit />} />

        <Route path="/teacher/add-notice" element={<TeacherAddNotice />} />
        <Route
          path="/teacher/display-notice"
          element={<TeacherDisplayNotice />}
        />
        <Route
          path="/teacher/display-course"
          element={<TeacherDisplayCourse />}
        />

        <Route
          path="/teacher/display-students"
          element={<TeacherDisplayStudent />}
        />

        <Route
          path="/teacher/display-teachers"
          element={<TeacherDisplayTeacher />}
        />

        <Route
          path="/teacher/student-attendance"
          element={<TeacherStudentAttendance />}
        />

        <Route
          path="/teacher/student-marks/:id"
          element={<TeacherStudentMarks />}
        />

        <Route
          path="/teacher/student-marks"
          element={<TeacherStudentMarksOverview />}
        />

        <Route
          path="/teacher/course/:courseId/subjects"
          element={<CourseSubjectsPage />}
        />

        {/* ****************************STUDENT ROUTES**********************************  */}
        <Route path="/student/fee" element={<StudentFee />} />
        <Route path="/student/attendance" element={<Student_Attendance />} />
        <Route
          path="/student/display-complaints"
          element={<StudentComplaint />}
        ></Route>
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="/student/exam" element={<StudentExam />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/dashboard" element={<StudentDashboard />}></Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  );
}

export default App;
