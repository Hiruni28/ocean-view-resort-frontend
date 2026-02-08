import React, { useState } from "react";
import axios from "axios";

const AddReservation = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    total: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/reservations", formData);
      alert("Reservation added successfully!");
      setFormData({
        customerName: "",
        email: "",
        roomId: "",
        checkInDate: "",
        checkOutDate: "",
        total: ""
      });
    } catch (error) {
      console.error("Error adding reservation:", error);
      alert("Failed to add reservation");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Reservation</h2>

      <form onSubmit={handleSubmit}>
        <label>Customer Name</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Room ID</label>
        <input
          type="text"
          name="roomId"
          value={formData.roomId}
          onChange={handleChange}
          required
        />

        <label>Check-In Date</label>
        <input
          type="date"
          name="checkInDate"
          value={formData.checkInDate}
          onChange={handleChange}
          required
        />

        <label>Check-Out Date</label>
        <input
          type="date"
          name="checkOutDate"
          value={formData.checkOutDate}
          onChange={handleChange}
          required
        />

        <label>Total Amount ($)</label>
        <input
          type="number"
          name="total"
          value={formData.total}
          onChange={handleChange}
          required
        />

        <button type="submit" style={{ marginTop: "10px" }}>Add Reservation</button>
      </form>
    </div>
  );
};

export default AddReservation;
