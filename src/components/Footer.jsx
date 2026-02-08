import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Ocean View Resort | All Rights Reserved</p>
    </footer>
  );
};

const styles = {
  footer: {
    background: "#004466",
    color: "white",
    padding: "10px",
    textAlign: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
  },
};

export default Footer;
