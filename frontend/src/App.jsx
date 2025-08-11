import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Zoom } from "react-toastify";

import Home from "./pages/Home";
import Forbidden from "./pages/Forbidden";
import ProtectedRoute from "./components/ProtectedRoutes";

// ADMIN IMPORTSimport Login from './pages/admin/Login';
import Dashboard from "./pages/admin/Dashboard";
import AddStudent from "./pages/admin/AddStudent";
import AddStudentMarks from "./pages/admin/AddStudentMarks";
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
import TeacherChangePassword from "./pages/teacher/TeacherChangePassword";

// STUDENT IMPORTS
import StudentMarksOverview from "./pages/admin/StudentMarksOverview";
import StudentAttendance from "./pages/admin/StudentAttendance";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentProfile from "./pages/student/StudentProfile";
import StudentFee from "./pages/student/StudentFee";
import Student_Attendance from "./pages/student/Student_Attendance";
import StudentResult from "./pages/student/StudentResult";
import Registration from "./pages/student/Registration";
import StudentComplaint from "./pages/student/StudentComplaint";
import TeacherProfileEdit from "./pages/teacher/TeacherProfileEdit";
import ChangePassword from "./pages/student/ChangePassword";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/forbidden" element={<Forbidden />} />

        {/* **************************** ADMIN ROUTES **************************** */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><Dashboard /></ProtectedRoute>
        } />
        <Route path="/admin/profile/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><Profile /></ProtectedRoute>
        } />
        <Route path="/admin/profile-edit/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><ProfileEdit /></ProtectedRoute>
        } />
        <Route path="/admin/add-student" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddStudent /></ProtectedRoute>
        } />
        <Route path="/admin/display-students" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplayStudent /></ProtectedRoute>
        } />
        <Route path="/admin/edit-student/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><EditStudent /></ProtectedRoute>
        } />
        <Route path="/admin/student-attendance" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><StudentAttendance /></ProtectedRoute>
        } />
        <Route path="/admin/student-marks" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><StudentMarksOverview /></ProtectedRoute>
        } />
        <Route path="/admin/add-student-marks/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddStudentMarks /></ProtectedRoute>
        } />
        <Route path="/admin/student-marks/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><StudentMarks /></ProtectedRoute>
        } />
        <Route path="/admin/student-fees" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><StudentFees /></ProtectedRoute>
        } />
        <Route path="/admin/add-teacher" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddTeacher /></ProtectedRoute>
        } />
        <Route path="/admin/display-teachers" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplayTeacher /></ProtectedRoute>
        } />
        <Route path="/admin/edit-teacher/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><EditTeacher /></ProtectedRoute>
        } />
        <Route path="/admin/teacher-attendance" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><TeacherAttendance /></ProtectedRoute>
        } />
        <Route path="/admin/add-notice" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddNotice /></ProtectedRoute>
        } />
        <Route path="/admin/display-notices" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplayNotice /></ProtectedRoute>
        } />
        <Route path="/admin/add-subject" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddSubject /></ProtectedRoute>
        } />
        <Route path="/admin/display-subjects" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplaySubject /></ProtectedRoute>
        } />
        <Route path="/admin/edit-subject/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><EditSubject /></ProtectedRoute>
        } />
        <Route path="/admin/add-course" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><AddCourse /></ProtectedRoute>
        } />
        <Route path="/admin/display-courses" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplayCourse /></ProtectedRoute>
        } />
        <Route path="/admin/edit-course/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><EditCourse /></ProtectedRoute>
        } />
        <Route path="/admin/display-complaints" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><DisplayComplaint /></ProtectedRoute>
        } />
        <Route path="/admin/edit-complaint/:id" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><EditComplaint /></ProtectedRoute>
        } />
        <Route path="/admin/course/:id/subjects" element={
          <ProtectedRoute allowedRoles={["ADMIN"]}><CourseSubjects /></ProtectedRoute>
        } />

        {/* **************************** TEACHER ROUTES **************************** */}
        <Route path="/teacher/dashboard" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherDashboard /></ProtectedRoute>
        } />
        <Route path="/teacher/profile" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherProfile /></ProtectedRoute>
        } />
        <Route path="/teacher/profile/:id" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherProfile /></ProtectedRoute>
        } />
        <Route path="/teacher/profile/edit/:id" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherProfileEdit /></ProtectedRoute>
        } />
        <Route path="/teacher/add-notice" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherAddNotice /></ProtectedRoute>
        } />
        <Route path="/teacher/display-notice" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherDisplayNotice /></ProtectedRoute>
        } />
        <Route path="/teacher/display-course" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherDisplayCourse /></ProtectedRoute>
        } />
        <Route path="/teacher/display-students" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherDisplayStudent /></ProtectedRoute>
        } />
        <Route path="/teacher/change-password" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherChangePassword /></ProtectedRoute>
        } />
        <Route path="/teacher/display-teachers" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherDisplayTeacher /></ProtectedRoute>
        } />
        <Route path="/teacher/student-attendance" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherStudentAttendance /></ProtectedRoute>
        } />
        <Route path="/teacher/students/marks/:id" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherStudentMarks /></ProtectedRoute>
        } />
        <Route path="/teacher/student-marks" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><TeacherStudentMarksOverview /></ProtectedRoute>
        } />
        <Route path="/teacher/course/:courseId/subjects" element={
          <ProtectedRoute allowedRoles={["TEACHER"]}><CourseSubjectsPage /></ProtectedRoute>
        } />

        {/* **************************** STUDENT ROUTES **************************** */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><StudentProfile /></ProtectedRoute>
        } />
        <Route path="/student/change-password" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><ChangePassword /></ProtectedRoute>
        } />
        <Route path="/student/fee" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><StudentFee /></ProtectedRoute>
        } />
        <Route path="/student/attendance" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><Student_Attendance /></ProtectedRoute>
        } />
        <Route path="/student/display-complaints" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><StudentComplaint /></ProtectedRoute>
        } />
        <Route path="/student/exam" element={
          <ProtectedRoute allowedRoles={["STUDENT"]}><StudentResult /></ProtectedRoute>
        } />
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
