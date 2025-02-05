import React from "react";
import Navbar from "../components/ui/Navbar";
import DashboardSideNav from "../components/elements/DashboardSideNav";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <div>
        <DashboardSideNav />

      </div>
    </div>
  );
}

export default Dashboard;