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

import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentMarksOverview from './pages/admin/StudentMarksOverview';
import StudentAttendance from './pages/admin/StudentAttendance';

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
          path='/admin/display-notices'
          element={<DisplayNotice />}
        />
        <Route
          path='/admin/display-students'
          element={<DisplayStudent />}
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
