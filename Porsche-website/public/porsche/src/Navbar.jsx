import React from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import './App.css'
import logo from "./images/porsche_logo.svg"
import ProductUpdate from "./ProductUpdate";
import App from "./App";

const handleLogout = () => {
    localStorage.clear(); 
    window.location.href = "/";
}
function Nav() {

    return(
        <>
        <div id="sidebar" className="sidebar">
            <a href="" className="closebtn"  style={{ fontFamily: "porscheFont" }}>X</a>
            <a href="#" style={{ fontFamily: "porscheFont" }} >Car Models</a>
            <a href="../views/locations.ejs" style={{ fontFamily: "porscheFont" }}>Locations</a>
            <a href="#" style={{ fontFamily: "porscheFont" }}>Clients</a>
            <a href="../views/Contact.ejs" style={{ fontFamily: "porscheFont" }}>Contact</a>
            <div id="secondSidebar" className="secondSidebar">
    <span href="#"  className="secondX">X</span>
    <div style={{ height: "75px" }}></div>
    <a><img src="../images/911 small.webp" style={{ width: "175px", height: "100px" }} /></a>
    <a><img src="../images/718 small.webp" style={{ width: "175px", height: "100px" }} /></a>
    <a><img src="../images/cayenne small.webp" style={{ width: "175px", height: "100px" }} /></a>
    <a><img src="../images/macan small.webp" style={{ width: "175px", height: "100px" }} /></a>
    <a><img src="../images/panamera small.webp" style={{ width: "175px", height: "100px" }} /></a>
         </div>
        </div>

<nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "black" }}>
  <input type="image" src={logo} className="overlappingLogo" width="45" height="45" />
  <div className="gapDiv"></div>
  <a className="navbar-brand" href="#" style={{ fontFamily: "porscheFont", fontSize: "22px" }}>Porsche™</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="spacerDiv"></div>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link" href="/" style={{ fontFamily: "porscheFont", color: "white", textDecoration: "none" }}>Home</a>
      <a className="nav-item nav-link" href="/about" style={{ fontFamily: "porscheFont", color: "white", textDecoration: "none" }}>About</a>
      <a className="nav-item nav-link" href="/contact" style={{ fontFamily: "porscheFont", color: "white", textDecoration: "none" }}>Contact Us</a>
      {localStorage.getItem("LoggedName")?<><a className="nav-item nav-link" href="/" style={{ fontFamily: "porscheFont", color: "white", textDecoration: "none", marginLeft: "350px", marginRight: "0px" }}>Welcome, {localStorage.getItem("LoggedName")}</a><a className="nav-item nav-link" onClick={handleLogout} style={{fontFamily: "porscheFont", color:"white", textDecoration:"none", marginLeft:"30px", cursor:"pointer"}}>Logout</a></>:<a className="nav-item nav-link" href="/login" style={{ fontFamily: "porscheFont", color: "white", textDecoration: "none", marginLeft: "350px", marginRight: "0px" }}>Login</a>}

      
    </div>
  </div>
</nav>
<hr className="red" />
<hr className="gold" />

        
        
        </>
    )
}
export default Nav;