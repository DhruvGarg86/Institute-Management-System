import { Route, Routes } from 'react-router-dom';
import Login from './pages/admin/Login';

function App() {
  return (
    <Routes>
      <Route 
      path='/'
      element = {<Login/>}
      />
    </Routes>
  )
}

export default App
