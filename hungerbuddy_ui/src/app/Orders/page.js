"use client";

import { useEffect, useState } from "react";
import { serverURL, getData, postData } from "../services/FetchNodeServices"

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await postData("users/fetch_all_orders",{mobileno:7788554566});
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading...</h3>;

  return (
    <div style={{ padding: "24px", maxWidth: "1000px", margin: "auto" }}>
  <h2 style={{ marginBottom: "24px" }}>🧾 All Orders</h2>

  {orders.map((item, index) => (
    <div
      key={index}
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        gap: "20px",
        padding: "18px",
        marginBottom: "18px",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        border: "1px solid #eee",
      }}
    >
      {/* Image */}
      <img
        src={`${serverURL}/images/${item.picture}`}
        alt={item.fooditemname}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "14px",
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        
        {/* Top Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h4 style={{ margin: 0 }}>{item.fooditemname}</h4>

          <span
            style={{
              background: "#e8f5e9",
              color: "#2e7d32",
              padding: "4px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            ₹ {`${item.amount}/-`}
          </span>
        </div>

        {/* Info */}
        <p style={{ margin: 0, color: "#555" }}>
          <b>Order ID:</b> {item.orderid}
        </p>

        <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
          <p style={{ margin: 0 }}>
            <b>Quantity:</b> {item.qty}
          </p>
          <p style={{ margin: 0 }}>
            <b>Txn ID:</b> {item.transaction_id}
          </p>
        </div>

        {/* Action */}
        <div>
          <button
          style={{
            marginTop: "10px",
            alignSelf: "flex-start",
            padding: "6px 16px",
            borderRadius: "20px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          View Details
        </button>
        <button
          style={{
            marginTop: "10px",
            marginLeft:"10px",
            alignSelf: "flex-start",
            padding: "6px 16px",
            borderRadius: "20px",
            border: "none",
            background: "#398527",
            color: "#fff",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Buy Again
        </button>


        </div>

        
      </div>
    </div>
  ))}
</div>

  );
}
