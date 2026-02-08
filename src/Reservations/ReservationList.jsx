import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>All Reservations</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Room</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.customerName}</td>
              <td>{r.email}</td>
              <td>{r.roomId}</td>
              <td>{r.checkInDate}</td>
              <td>{r.checkOutDate}</td>
              <td>${r.total}</td>
              <td>
                <Link to={`/reservations/view/${r.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
