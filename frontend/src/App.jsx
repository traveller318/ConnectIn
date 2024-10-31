import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Pages/HomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import JobSeekerHomePage from './components/Pages/JobSeekerHomePage';
import EmployerHomePage from './components/Pages/EmployerHomePage';
import AfterJobSeekerRegisterPage from './components/Pages/AfterJobSeekerRegisterPage';
import AfterEmployerRegisterPage from './components/Pages/AfterEmployerRegisterPage'
import ArticlePage from './components/Pages/ArticlePage';
import JobSeekerProfile from './components/Pages/JobSeekerProfile';
import SavedJobs from './components/Pages/SavedJobs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/after-job-seeker-register" element={<AfterJobSeekerRegisterPage />} />
        <Route path="/after-employer-register" element={<AfterEmployerRegisterPage />} />
        <Route path="/jobSeekerHome" element={<JobSeekerHomePage />} />
        <Route path="/employerHome" element={<EmployerHomePage />} />
        <Route path="/articles" element={<ArticlePage />} />
        <Route path="/job-seeker-profile" element={<JobSeekerProfile />} />
        <Route path="/saved-jobs" element={<SavedJobs />} />

      </Routes>
    </Router>
  )
}

export default App
