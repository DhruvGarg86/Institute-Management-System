import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/admin/Profile';
import AddNotice from './pages/admin/AddNotice';
import AddStudent from './pages/admin/AddStudent';
import DisplayNotice from './pages/admin/DisplayNotice';
import DisplayStudent from './pages/admin/DisplayStudent';
import EditStudent from './pages/admin/EditStudent';
import StudentMarks from './pages/admin/StudentMarks';


// TEACHER IMPORTS
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import TeacherAddNotice from './pages/teacher/TeacherAddNotice'
import TeacherDisplayNotice from './pages/teacher/TeacherDisplayNotice'
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherDisplayStudent from './pages/teacher/TeacherDisplayStudent'
import TeacherStudentAttendance from './pages/teacher/TeacherStudentAttendance'
import TeacherStudentMarks from './pages/teacher/TeacherStudentMarks';
import TeacherStudentMarksOverview from './pages/teacher/TeacherStudentMarksOverview';




import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentMarksOverview from './pages/admin/StudentMarksOverview';
import StudentAttendance from './pages/admin/StudentAttendance';
import StudentFees from './pages/admin/StudentFees';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/admin/dashboard'
          element={<Dashboard />}
        />
        <Route
          path='/admin/profile'
          element={<Profile />}
        />
        <Route
          path='/admin/add-notice'
          element={<AddNotice />}
        />
        <Route
          path='/admin/add-student'
          element={<AddStudent />}
        />
        <Route
          path='/admin/edit-student/:id'
          element={<EditStudent />}
        />
        <Route
          path='/admin/student-attendance'
          element={<StudentAttendance />}
        />
        <Route
          path='/admin/student-marks'
          element={<StudentMarksOverview />}
        />
        <Route
          path='/admin/student-marks/:id'
          element={<StudentMarks />}
        />
        <Route
          path='/admin/student-fees'
          element={<StudentFees />}
        />
        <Route
          path='/admin/display-notices'
          element={<DisplayNotice />}
        />
        <Route
          path='/admin/display-students'
          element={<DisplayStudent />}
        />
        


{/* *****************************TEACHER ROUTES***********************************  */}
        <Route
          path='/teacher/dashboard'
          element={<TeacherDashboard/>}
        />

        <Route
          path='/teacher/profile'
          element={<TeacherProfile/>}
        />

        <Route
          path='/teacher/add-notice'
          element={<TeacherAddNotice/>}
        />

        <Route
          path='/teacher/display-notice'
          element={<TeacherDisplayNotice/>}
        />

        <Route
          path='/teacher/display-students'
          element={<TeacherDisplayStudent/>}
        />

        <Route
          path='/teacher/student-attendance'
          element={<TeacherStudentAttendance/>}
        />

        <Route
          path='/teacher/student-marks/:id'
          element={<TeacherStudentMarks/>}
        />

        <Route
          path='/teacher/student-marks'
          element={<TeacherStudentMarksOverview/>}
        />
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
  )
}

export default App
