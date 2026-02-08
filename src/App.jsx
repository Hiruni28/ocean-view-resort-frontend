import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

// Pages
import Login from "./pages/Login";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";

// Reservations
import AddReservation from "./pages/Reservations/AddReservation";
import ViewReservation from "./pages/Reservations/ViewReservation";
import ReservationList from "./pages/Reservations/ReservationList";

// Staff
import AddStaff from "./pages/Staff/AddStaff";
import StaffList from "./pages/Staff/StaffList";

// Food
import OrderFood from "./pages/Food/OrderFood";
import FoodOrderList from "./pages/Food/FoodOrderList";

// Billing
import GenerateBill from "./pages/Billing/GenerateBill";
import BillHistory from "./pages/Billing/BillHistory";

// Help Page
import Help from "./pages/Help";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container flex">

          {/* Sidebar only visible after login */}
          <ProtectedRoute>
            <Sidebar />
          </ProtectedRoute>

          <div className="main-content flex-1">
            <Navbar />

            <Routes>
              {/* Public Route */}
              <Route path="/login" element={<Login />} />

              {/* Dashboards */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/customer"
                element={
                  <ProtectedRoute>
                    <CustomerDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Reservations */}
              <Route
                path="/reservations/add"
                element={
                  <ProtectedRoute>
                    <AddReservation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reservations/view/:id"
                element={
                  <ProtectedRoute>
                    <ViewReservation />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <ReservationList />
                  </ProtectedRoute>
                }
              />

              {/* Staff */}
              <Route
                path="/staff/add"
                element={
                  <ProtectedRoute>
                    <AddStaff />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/staff"
                element={
                  <ProtectedRoute>
                    <StaffList />
                  </ProtectedRoute>
                }
              />

              {/* Food */}
              <Route
                path="/food/order"
                element={
                  <ProtectedRoute>
                    <OrderFood />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/food/orders"
                element={
                  <ProtectedRoute>
                    <FoodOrderList />
                  </ProtectedRoute>
                }
              />

              {/* Billing */}
              <Route
                path="/billing/generate"
                element={
                  <ProtectedRoute>
                    <GenerateBill />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/billing/history"
                element={
                  <ProtectedRoute>
                    <BillHistory />
                  </ProtectedRoute>
                }
              />

              {/* Help */}
              <Route
                path="/help"
                element={
                  <ProtectedRoute>
                    <Help />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
