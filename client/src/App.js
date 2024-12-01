import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Forget from './pages/Forget';
import Reset from './pages/Reset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forget-password' element={<Forget />} />
        <Route path='/reset' element={<Reset />} />
      </Routes>
    </Router>
  );
}

export default App;
