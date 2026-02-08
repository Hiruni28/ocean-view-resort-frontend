import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodOrderList = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/food-orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching food orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>Food Orders List</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customerId}</td>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
              <td>{order.quantity * order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FoodOrderList;
