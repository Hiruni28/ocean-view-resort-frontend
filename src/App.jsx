import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Reservation from "./pages/Reservation";
import Manage from "./pages/ManageReservations";
import Reports from "./pages/Reports";
import Help from "./pages/Help";

import CustomerHome from "./pages/CustomerHome";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";
import Customerviewrooms from "./pages/Customerviewrooms";

import ManageStaff from "./pages/ManageStaff";

import StaffLogin from "./pages/stafflogin";
import StaffDashboard from "./pages/StaffDashboard";
import StaffRooms from "./pages/StaffRooms";
import StaffHelp from "./pages/StaffHelp";
import Staffmanagereservation from "./pages/Staffmanagereservation";
import StaffReservation from "./pages/StaffReservation";

// ----------------- MultiWindowLauncher -----------------
function MultiWindowLauncher() {
  useEffect(() => {
    const width = window.screen.width;
    const height = window.screen.height;
    const features = `width=${width},height=${height},top=0,left=0,scrollbars=yes,resizable=yes`;

    // Open Customer Home
    window.open("/customer", "CustomerWindow", features);
    // Open Staff Login
    window.open("/staff-login", "StaffWindow", features);
    // Open Admin Login
    window.open("/admin-login", "AdminWindow", features);
  }, []);

  return <div>Launching Customer, Staff, and Admin windows...</div>;
}

// ----------------- App -----------------
function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>

        {/* ------------------- ROOT ROUTE: LAUNCH ALL WINDOWS ------------------- */}
        <Route path="/" element={<MultiWindowLauncher />} />

        {/* ------------------- CUSTOMER SIDE ROUTES ------------------- */}
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/cusdashboard" element={<CustomerDashboard />} />
        <Route path="/customer/cusviewrooms" element={<Customerviewrooms />} />

        {/* ------------------- STAFF SIDE ROUTES ------------------- */}
        {!isStaffLoggedIn ? (
          <>
            <Route
              path="/staff-login"
              element={<StaffLogin setLogin={setIsStaffLoggedIn} />}
            />
            <Route path="/staff/*" element={<Navigate to="/staff-login" />} />
          </>
        ) : (
          <Route
            path="/staff/*"
            element={<StaffDashboard logout={() => setIsStaffLoggedIn(false)} />}
          >
            <Route index element={<StaffReservation />} />
            <Route path="rooms" element={<StaffRooms />} />
            <Route path="reservation" element={<StaffReservation />} />
            <Route path="managereservation" element={<Staffmanagereservation />} />
            <Route path="help" element={<StaffHelp />} />
            <Route path="*" element={<StaffReservation />} />
          </Route>
        )}

        {/* ------------------- ADMIN SIDE ROUTES ------------------- */}
        {!isAdminLoggedIn ? (
          <>
            <Route
              path="/admin-login"
              element={<Login setLogin={setIsAdminLoggedIn} />}
            />
            <Route path="/" element={<Navigate to="/admin-login" />} />
          </>
        ) : (
          <Route
            path="/"
            element={<Dashboard logout={() => setIsAdminLoggedIn(false)} />}
          >
       {/* Nested routes under Dashboard */}
            <Route index element={<Navigate to="/rooms" />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="reservation" element={<Reservation />} />
            <Route path="manage" element={<Manage />} />
            <Route path="staff-manage" element={<ManageStaff />} />
            <Route path="reports" element={<Reports />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<Navigate to="/rooms" />} />
          </Route>
        )}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
