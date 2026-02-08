import React, { useState } from "react";
import axios from "axios";

const GenerateBill = () => {
  const [reservationId, setReservationId] = useState("");
  const [bill, setBill] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!reservationId) {
      alert("Please enter reservation ID");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/billing/generate",
        { reservationId: Number(reservationId) }
      );
      setBill(response.data);
      alert("Bill generated successfully!");
    } catch (error) {
      console.error("Error generating bill:", error);
      alert("Unable to generate bill!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>Generate Bill</h2>

      <form onSubmit={handleGenerate}>
        <label>Reservation ID:</label>
        <input
          type="number"
          value={reservationId}
          onChange={(e) => setReservationId(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "14px" }}>
          Generate
        </button>
      </form>

      {bill && (
        <div style={{ marginTop: "30px", border: "1px solid #ccc", padding: "20px" }}>
          <h3>Bill Details</h3>
          <p><strong>Bill ID:</strong> {bill.id}</p>
          <p><strong>Reservation ID:</strong> {bill.reservationId}</p>
          <p><strong>Room Cost:</strong> Rs. {bill.roomCost}</p>
          <p><strong>Food Cost:</strong> Rs. {bill.foodCost}</p>
          <p><strong>Total Amount:</strong> Rs. {bill.totalAmount}</p>
          <p><strong>Generated On:</strong> {bill.generatedDate}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateBill;
