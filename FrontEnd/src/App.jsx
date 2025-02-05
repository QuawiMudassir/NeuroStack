import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import LandingPage from './pages/AssistancePal';
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AssistancePal" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/company" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
