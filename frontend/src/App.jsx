import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import JobSeekerHomePage from './components/Pages/JobSeekerHomePage';
import EmployerHomePage from './components/Pages/EmployerHomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobSeekerHome" element={<JobSeekerHomePage />} />
        <Route path="/employerHome" element={<EmployerHomePage />} />
      </Routes>
    </Router>
  )
}

export default App
