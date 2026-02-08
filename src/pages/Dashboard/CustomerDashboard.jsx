import React from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const CustomerDashboard = () => {
  return (
    <>
      <Navbar />
      <Sidebar />

      <div style={styles.container}>
        <h1>Customer Dashboard</h1>

        <div style={styles.cardContainer}>
          <div style={styles.card}>My Reservations</div>
          <div style={styles.card}>Order Food</div>
          <div style={styles.card}>View Bills</div>
          <div style={styles.card}>Profile Settings</div>
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
    gridTemplateColumns: "repeat(2, 250px)",
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

export default CustomerDashboard;
