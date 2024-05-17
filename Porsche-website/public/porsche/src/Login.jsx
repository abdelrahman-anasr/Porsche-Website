import axios from 'axios';
import './App.css'; // Import your CSS files
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './Navbar';
export default function  Login() {
  
  const url = "http://localhost:3001/customers/login";
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // for the username
  var isError = false;

  const navigate = useNavigate();
    const UpdateEmail = (e) =>{
        setEmail(e.target.value)
    }
    const UpdatePassword = (e) =>{
        setPassword(e.target.value)
    }

    const UpdateName = (e) =>{
        setName(e.target.value)
    }

  const handleLogin = async (event) => {
    event.preventDefault();
    const customer = {email, password}
    const response = await axios.post(url,{
        email: customer.email,
        password: customer.password

    }).catch((error) => {

        isError = true;
        alert("Invalid Email or Password")

    })
    

    const result = await axios.get("http://localhost:3001/customers");
    console.log(result)
    localStorage.setItem("Email" , email)

    if(!isError){
    localStorage.setItem("LoggedName" , name);
    navigate("/");
    }

  };

  return (
    <>
    <Nav />
      <div className="form-div">
        <div className="container">
          <h2>Login</h2>
          <form className="form-horizontal" onSubmit={handleLogin}>
          <div className="form-group">
              <label className="control-label col-sm-2">Name</label>
              <div className="col-sm-10">
                <input 
                  type="text" 
                  className="form-control mb-1" 
                  id="First Name"
                  placeholder="Enter first name" 
                  name="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
            </div>
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
                  className="form-control mb-3" 
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
      <div className="row justify-content-center mt-3">
        <div className="col-md-6 text-center">
          <div className="container signin">
            <p style={{fontFamily: "porscheFont"}}>Don't have an account? <Link to='/Register'>Sign up</Link>.</p>
          </div>
        </div>
      </div>
      <div className="row justify-content-center mt-1">
        <div className="col-md-6 text-center">
          <div className="container signin">
            <p style={{fontFamily: "porscheFont"}}>Login as Admin instead? <Link to='/AdminLogin'>Here</Link>.</p>
          </div>
        </div>
      </div>
      
    </>
  );
}