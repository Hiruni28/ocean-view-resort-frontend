import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div style={styles.container}>
        <h1>Admin Dashboard</h1>

        <div style={styles.cardContainer}>
          <div style={styles.card}>Manage Reservations</div>
          <div style={styles.card}>Manage Customers</div>
          <div style={styles.card}>Manage Staff</div>
          <div style={styles.card}>Food Orders</div>
          <div style={styles.card}>Billing Reports</div>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    marginLeft: "240px",
    padding: "20px",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 250px)",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    padding: "25px",
    background: "#f1f1f1",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default AdminDashboard;
