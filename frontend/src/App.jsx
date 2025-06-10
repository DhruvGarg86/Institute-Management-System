import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/admin/Profile';
import AddNotice from './pages/admin/AddNotice';
import AddStudent from './pages/admin/AddStudent';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
