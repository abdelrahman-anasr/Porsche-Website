
import axios from 'axios';
import './App.css'
import React, { useState, useEffect } from 'react';
import ProdPost from './AddProduct';
import ProductDetails from './PorscheDetails';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Car from './cars';
import ProductUpdate
 from './ProductUpdate';
 import Nav from './Navbar';

function ProdPage(){
    return(
        <>
          <Nav/>
        <h2 style={{ fontFamily: "porscheFont",fontSize:"40px", color: "#B12B28;", textAlign: "center" }}>Products</h2>
        <ProductDetails/>
            
        </>
    )
}
export default ProdPage;