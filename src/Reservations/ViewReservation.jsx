import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewReservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/reservations/${id}`);
        setReservation(response.data);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };

    fetchReservation();
  }, [id]);

  if (!reservation) return <p>Loading reservation...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Reservation Details</h2>

      <p><strong>Customer Name:</strong> {reservation.customerName}</p>
      <p><strong>Email:</strong> {reservation.email}</p>
      <p><strong>Room ID:</strong> {reservation.roomId}</p>
      <p><strong>Check-In:</strong> {reservation.checkInDate}</p>
      <p><strong>Check-Out:</strong> {reservation.checkOutDate}</p>
      <p><strong>Total:</strong> ${reservation.total}</p>
    </div>
  );
};

export default ViewReservation;
