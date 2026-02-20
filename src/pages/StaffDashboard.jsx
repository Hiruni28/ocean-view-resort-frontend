import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import StaffSidebar from "../components/StaffSidebar";
import { LogOut, User } from "lucide-react";

export default function StaffDashboard({ logout }) {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const staffUser = localStorage.getItem("staffUsername");
    if (!staffUser) {
      // If no login info, redirect to login
      navigate("/staff-login", { replace: true });
    } else {
      setUsername(staffUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("staffUsername");
    logout(); // update isStaffLoggedIn = false
    navigate("/staff-login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <StaffSidebar logout={handleLogout} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="px-10 py-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">{username}</span>
                </h1>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-10 bg-gray-50">
          {/* Nested Pages Render Here */}
          <Outlet />
        </div>

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
