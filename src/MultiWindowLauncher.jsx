import { useEffect } from "react";

function MultiWindowLauncher() {
  useEffect(() => {
    // Open Customer window
    window.open("/customer", "CustomerWindow", "width=800,height=600");

    // Open Staff window
    window.open("/staff-login", "StaffWindow", "width=800,height=600");

    // Open Admin window
    window.open("/admin-login", "AdminWindow", "width=800,height=600");
  }, []); // <-- empty dependency array ensures this runs only once

  return <div>Launching Customer, Staff, and Admin windows...</div>;
}

export default MultiWindowLauncher;
