import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import LoginSignup from "../components/elements/LoginSignup";

function LoginPage() {
  return (
    <div>
        <Navbar />
            <LoginSignup />
        <Footer />
    </div>
  );
}

export default LoginPage;
