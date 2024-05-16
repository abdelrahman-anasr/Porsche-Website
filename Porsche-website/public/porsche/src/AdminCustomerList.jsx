import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const url = "http://localhost:3001/customers"; // Ensure this URL is correct and your backend is running
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
      <h1 style={{ color: "green" }}>Customer List</h1>
      <table class="table">
        <thead>
        <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
        </tr>
    </thead>
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : data.length === 0 ? (
          <p>No customers available.</p>
        ) : (
            data.map(data => 
            <tr>
                <td>{data.first_name}</td>
                <td>{data.last_name}</td>
                <td>{data.email}</td>
                <td>{data.password}</td>
            </tr>)
        )}
      </table>
    </div>
  );
}

export default App;