import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

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
    </Routes>
  )
}

export default App
