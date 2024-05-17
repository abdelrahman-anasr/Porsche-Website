import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { redirect } from "react-router-dom";
import './App.css'
import logo from "./images/porsche_logo.svg"
import largelogo from "./images/seekLogo.svg"
import ProductUpdate from "./ProductUpdate";
import App from "./App";
import Nav from "./Navbar";
import ProductDetails from "./PorscheDetails";
function HomePage() {
    return (
        <>
        <Nav/>
        <div style={{ height: "525px", width: "100%", opacity: 1, marginTop: "0%", paddingTop: "0%" }}>
  <img src={largelogo} style={{ position: "absolute", zIndex: 1, top: "15%", left: "36.5%", width: "400px", height: "400px" }} />
  <video autoPlay muted loop style={{ zIndex: -1, opacity: 0.6 }}>
    <source src={require('./videos/porscheIntro.mp4')} type="video/mp4" />
  </video>
</div>

<h1 style={{ fontFamily: "porscheFont" }}>Find Your Model</h1>
  <ProductDetails/>



        </>
    )
}

export default HomePage;