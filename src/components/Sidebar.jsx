import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={styles.sidebar}>
      <h3 style={styles.header}>Menu</h3>

      <ul style={styles.menu}>
        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/reservations" style={styles.link}>Reservations</Link></li>
        <li><Link to="/customers" style={styles.link}>Customers</Link></li>
        <li><Link to="/food" style={styles.link}>Food Orders</Link></li>
        <li><Link to="/billing" style={styles.link}>Billing</Link></li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "220px",
    background: "#f1f1f1",
    height: "100vh",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
  },
  header: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  menu: {
    listStyle: "none",
    paddingLeft: 0,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    display: "block",
    padding: "10px 0",
  },
};

export default Sidebar;
