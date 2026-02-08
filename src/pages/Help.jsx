import React from "react";

const Help = () => {
  return (
    <div style={{ maxWidth: "900px", margin: "auto", lineHeight: "1.8" }}>
      <h2>Help & User Guide</h2>

      <p>
        Welcome to the <strong>Ocean View Resort Reservation System</strong>.  
        This guide helps staff and customers understand how to use the system
        effectively.
      </p>

      <hr />

      <h3>1. Login Instructions</h3>
      <p>
        • Enter your <strong>username</strong> and <strong>password</strong>.  
        <br />
        • Admins and staff will be redirected to their dashboards.
      </p>

      <hr />

      <h3>2. Admin Dashboard Features</h3>
      <ul>
        <li>Manage reservations</li>
        <li>Add and manage staff</li>
        <li>View and update customer records</li>
        <li>View food orders</li>
        <li>Generate and view billing details</li>
      </ul>

      <hr />

      <h3>3. Customer Dashboard Features</h3>
      <ul>
        <li>View your reservation details</li>
        <li>Update basic information</li>
        <li>Order food from the resort menu</li>
        <li>Check your bill summary</li>
      </ul>

      <hr />

      <h3>4. Reservation Management</h3>
      <p>
        • Admins and staff can register new guests.<br />
        • Required fields: guest name, address, contact, room type, check-in, check-out.<br />
        • Ensure details are accurate to avoid conflicts.
      </p>

      <hr />

      <h3>5. Food Ordering Guide</h3>
      <p>
        • Customers can place food orders directly from their dashboard.<br />
        • Simply select food items, quantity, and confirm order.<br />
        • All food orders are added to the final bill.
      </p>

      <hr />

      <h3>6. Billing Instructions</h3>
      <p>
        • Bills are generated based on room cost, stay duration, and food orders.<br />
        • Admins can view complete bill history.<br />
        • Customers can view their own bill summary.
      </p>

      <hr />

      <h3>7. Getting Additional Support</h3>
      <p>
        If you need additional help, please contact the system administrator or your supervisor.
      </p>
    </div>
  );
};

export default Help;
