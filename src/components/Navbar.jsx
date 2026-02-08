import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>Ocean View Resort</h2>

      <div style={styles.links}>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to="/reservations" style={styles.link}>
          Reservations
        </Link>
        <Link to="/food" style={styles.link}>
          Food Orders
        </Link>
        <Link to="/billing" style={styles.link}>
          Billing
        </Link>

        <button onClick={logout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#004466",
    padding: "10px 20px",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { margin: 0 },
  links: { display: "flex", gap: "15px", alignItems: "center" },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  logoutBtn: {
    background: "#ff4444",
    color: "white",
    border: "none",
    padding: "7px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
