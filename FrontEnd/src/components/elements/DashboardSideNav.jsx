import React from "react";
import { Link } from "react-router-dom";


const DashboardSideNav = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar - 20% Width */}
      <div className="w-1/5 min-w-[200px] flex flex-col justify-between bg-white shadow-lg">
        <div className="px-4 py-6">
          

          {/* Premium Services Section */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Premium Services</h2>
            <ul className="mt-2 space-y-1">
            <li>
                <Link to="/patients" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  MedEase
                </Link>
              </li>
              <li>
                <Link to="/neural-net-x" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Neural Net X
                </Link>
              </li>
              <li>
                <Link to="/assistant-pal" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Assistant Pal
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Section */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-500 uppercase">Account</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <Link to="/profile" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/logout" className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Section */}
        <div className="border-t border-gray-100">
          <Link to="/profile" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
            <img
              alt="Profile"
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">Eric Frusciante</strong>
                <span>eric@frusciante.com</span>
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Main Dashboard Area */}
      <div className="w-4/5 p-6 bg-gray-100">
        <h1 className="text-xl font-bold">Dashboard Content Goes Here</h1>
        {/* Add your dashboard components inside this div */}
      </div>
    </div>
  );
};

export default DashboardSideNav;
