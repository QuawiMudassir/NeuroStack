import React from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Patient from "../components/elements/Patient";

function PatientDetails() {
  return (
    <div>
        <Navbar />
            <Patient />
        <Footer />
    </div>
  );
}

export default PatientDetails;