import axios from 'axios';
import './App.css'; // Import your CSS files
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
export default function  Login() {
  const url = "http://localhost:3001/customers/login"; // Ensure this URL is correct and your backend is running
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    const UpdateEmail = (e) =>{
        setEmail(e.target.value)
    }
    const UpdatePassword = (e) =>{
        setPassword(e.target.value)
    }

  const handleLogin = async (event) => {
    event.preventDefault();
    const customer = {email, password}
    await axios.post(url,{
        email: customer.email,
        password: customer.password
    })
    const result = await axios.get("http://localhost:3001/customers")
    localStorage.setItem("Email" , email)
    navigate("/");



  };

  return (
    <>
      <div className="form-div">
        <div className="container">
          <h2>Login</h2>
          <form className="form-horizontal" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="control-label col-sm-2">Email</label>
              <div className="col-sm-10">
                <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="Enter Email" 
                  name="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-2">Password</label>
              <div className="col-sm-10">
                <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="Enter Password" 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
    </>
  );
}