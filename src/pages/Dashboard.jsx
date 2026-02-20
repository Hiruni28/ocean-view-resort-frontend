import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard({ logout }) {
  const [page, setPage] = useState("rooms");
  const [username, setUsername] = useState("");

  const navigate = useNavigate(); 

  // Display admin's username on dashboard
  useEffect(() => {
    const adminUser = localStorage.getItem("adminUsername");
    if (adminUser) {
      setUsername(adminUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminUsername");
    logout();  //updates isAdminLoggedIn = false
    navigate("/admin-login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar setPage={setPage} logout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="px-8 py-5 flex justify-between items-center">
            {/* Welcome Section */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, <span className="text-orange-600">{username || "Admin"}</span>
                </h1>
              </div>
            </div>

            {/* Right Section - Logout Button */}
            <button
              onClick={handleLogout}
              className="group flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-rose-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-rose-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            © 2024 Ocean View Resort. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
