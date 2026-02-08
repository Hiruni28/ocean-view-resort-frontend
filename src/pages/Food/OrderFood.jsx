import React, { useState } from "react";
import axios from "axios";

const OrderFood = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    itemName: "",
    quantity: "",
    price: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      customerId: Number(formData.customerId),
      itemName: formData.itemName,
      quantity: Number(formData.quantity),
      price: Number(formData.price)
    };

    try {
      await axios.post("http://localhost:8080/api/food-orders", reqData);
      alert("Food order placed successfully!");

      setFormData({
        customerId: "",
        itemName: "",
        quantity: "",
        price: ""
      });
    } catch (error) {
      console.error("Error placing food order:", error);
      alert("Failed to place food order");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Place Food Order</h2>

      <form onSubmit={handleSubmit}>
        <label>Customer ID</label>
        <input
          type="number"
          name="customerId"
          required
          value={formData.customerId}
          onChange={handleChange}
        />

        <label>Food Item</label>
        <input
          type="text"
          name="itemName"
          required
          value={formData.itemName}
          onChange={handleChange}
        />

        <label>Quantity</label>
        <input
          type="number"
          name="quantity"
          min="1"
          required
          value={formData.quantity}
          onChange={handleChange}
        />

        <label>Price (per item)</label>
        <input
          type="number"
          name="price"
          min="0"
          required
          value={formData.price}
          onChange={handleChange}
        />

        <button type="submit" style={{ marginTop: "12px" }}>
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderFood;
