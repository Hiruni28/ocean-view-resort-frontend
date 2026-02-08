import React, { useEffect, useState } from "react";
import axios from "axios";

const BillHistory = () => {
  const [bills, setBills] = useState([]);

  const loadBills = async () => 
  {
    try {
      const response = await axios.get("http://localhost:8080/api/billing/all");
      setBills(response.data);
    } 
    catch (error) 
    {
      console.error("Error loading bill history:", error);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>Bill History</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Reservation ID</th>
            <th>Room Cost</th>
            <th>Food Cost</th>
            <th>Total</th>
            <th>Generated Date</th>
          </tr>
        </thead>

        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.reservationId}</td>
              <td>{bill.roomCost}</td>
              <td>{bill.foodCost}</td>
              <td><strong>{bill.totalAmount}</strong></td>
              <td>{bill.generatedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillHistory;
