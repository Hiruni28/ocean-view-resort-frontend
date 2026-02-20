import React from "react";
import { NavLink } from "react-router-dom";
import { Hotel, Calendar, ClipboardList, HelpCircle } from "lucide-react";

export default function StaffSidebar({ logout }) {
  const linkClass = ({ isActive }) =>
    `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group font-medium
     ${isActive 
       ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg scale-105" 
       : "text-gray-100 hover:bg-white/10 hover:translate-x-1"}`;

  return (
    <div className="w-72 bg-gradient-to-b from-slate-800 via-slate-800 to-slate-900 text-white min-h-screen flex flex-col shadow-2xl border-r border-slate-700/50">
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-3">
            <img
              src="/logo.png"
              alt="Ocean View Logo"
              className="object-contain w-full h-full"
            />
          </div>
          
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Ocean View Resort
          </h2>
          <p className="text-sm text-gray-400 font-medium mt-1">Staff Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Main Menu
          </p>
        </div>

        <NavLink to="/staff/rooms" className={linkClass}>
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            <Hotel className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <span>Rooms</span>
        </NavLink>

        <NavLink to="/staff/reservation" className={linkClass}>
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <span>Reservation</span>
        </NavLink>

        <NavLink to="/staff/managereservation" className={linkClass}>
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            <ClipboardList className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <span>Manage Reservations</span>
        </NavLink>

        <div className="my-4 border-t border-slate-700/50"></div>

        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
            Support
          </p>
        </div>

        <NavLink to="/staff/help" className={linkClass}>
          <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
            <HelpCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </div>
          <span>Help</span>
        </NavLink>
      </nav> 
    </div>
  );
}
