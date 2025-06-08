import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import Profile from './pages/admin/Profile';
import AddNotice from './pages/admin/AddNotice';

function App() {
  return (
    <Routes>
      <Route 
      path='/'
      element = {<Login/>}
      />
      <Route 
      path='/admin/dashboard'
      element = {<Dashboard/>}
      />
      <Route 
      path='/admin/profile'
      element = {<Profile/>}
      />
      <Route 
      path='/admin/add-notice'
      element = {<AddNotice/>}
      />
    </Routes>
  )
}

export default App
