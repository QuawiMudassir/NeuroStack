import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import LandingPage from './pages/AssistancePal';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const isAuthenticated = !!localStorage.getItem("authToken");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AssistancePal" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/company" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route
    path="/dashboard/:doctorId/patients"
    element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
  />
      </Routes>
    </Router>
  );
}

export default App;
