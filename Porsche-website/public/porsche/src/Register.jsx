import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import './css/style.css';
import './css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RegistrationForm() {
  const inputStyle = {
    backgroundColor: '#EBD698',
  };
 const [FirstName,  setFirstName] = useState("")
 const [LastName,  setLastName] = useState("")
 const [email, setEmail] = useState("")
 const [DOB, setDOB] = useState("")
 const [password, setPassword] = useState("")

 const UpdateFirstName= (e) => {
   setFirstName(e.target.value)
  }

  const UpdateLastName = (e) => {
  setLastName(e.target.value)
 }
 
 const UpdateEmail = (e) => {
  setEmail(e.target.value)
 }
 
 const UpdateDOB = (e) => {
  setDOB(e.target.value)
 }

 const UpdatePassword = (e) => {
  setPassword(e.target.value)
 }

const url = "http://localhost:3001/customers"
const handleSubmit = async (e) => {
  e.preventDefault();
  const customer = {FirstName, LastName, email, password, DOB}
  await axios.post(url, { 
      first_name: customer.FirstName, 
      last_name: customer.LastName,
      email: customer.email,
      password: customer.password,
      DOB: customer.DOB,
  })

  console.log(customer)
}


  return (
    
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form id="registrationForm" required onSubmit={handleSubmit}>
            <label ><b>First Name</b></label>
            <input type="text" onChange={UpdateFirstName} className="form-control"  placeholder="First Name" name="first_name" id="email" required /><br />

            <label><b>Last Name</b></label>
            <input type="text"onChange={UpdateLastName} className="form-control"  placeholder="Last Name" name="last_name" id="email" required /><br />

            <label><b>Email</b></label>
            <input type="text" onChange={UpdateEmail} className="form-control"  placeholder="Email Address" name="email" id="email" required /><br />

            <label>Date of birth:</label>
            <input type="date" onChange={UpdateDOB} className="form-control"  id="dob" name="dob" /><br />

            <label><b>Password</b></label>
            <input type="password" onChange={UpdatePassword} className="form-control"  placeholder="Password" name="password" id="psw" required /><br />

            <button type="submit" id="myBtn" className="btn btn-primary custom-btn">Register</button>
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col-md-6 text-center">
          <div className="container signin">
            <p>Already have an account? <Link to='/login'>Sign in</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationForm;