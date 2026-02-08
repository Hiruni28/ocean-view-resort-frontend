import React, { useState } from "react";
import axios from "axios";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/staff", formData);
      alert("Staff member added successfully!");

      setFormData({
        name: "",
        role: "",
        email: "",
        phone: ""
      });
    } catch (error) {
      console.error("Error adding staff:", error);
      alert("Failed to add staff");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Add Staff Member</h2>

      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <label>Role / Position</label>
        <input
          type="text"
          name="role"
          required
          value={formData.role}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: "12px" }}>Add Staff</button>
      </form>
    </div>
  );
};

export default AddStaff;
