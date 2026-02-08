import React, { useEffect, useState } from "react";
import axios from "axios";

const StaffList = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/staff");
        setStaff(response.data);
      } catch (error) {
        console.error("Error loading staff:", error);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Staff Members</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {staff.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
