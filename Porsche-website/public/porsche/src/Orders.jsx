import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";


function Order() {

  const url = "http://localhost:3001/orders"; // Update URL to fetch orders
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  
  const fetchInfo = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data); // Save fetched data to state
      console.log(res.data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  console.log(data)
  
  return (
    <div className="App">
      <h1 style={{ color: "green" }}>Order List</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Product ID</th>
            <th scope="col">Email</th>
            <th scope="col">Order Date</th>
            
          </tr>
        </thead>
        <tbody>
          {error ? (
            <tr>
              <td colSpan="3" style={{ color: "red" }}>Error: {error}</td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan="3">No orders available.</td>
            </tr>
          ) : (
            data.map(data => 
              <tr key={data._id}>
                <td>{data.orderId}</td>
                <td>{data.productId}</td>
                <td>{data.user_email}</td>
                <td>{data.order_date}</td>  
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Order;