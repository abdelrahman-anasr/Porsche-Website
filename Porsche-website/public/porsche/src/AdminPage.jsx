import { Button } from "react-bootstrap";
import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default function CustomerList () {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('/api/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer.id}>
              <td>{index + 1}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              {/* Add more table cells with customer data */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

