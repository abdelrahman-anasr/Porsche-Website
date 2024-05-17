import { Button } from "react-bootstrap";
import './App.css'
import React, { useEffect,useState } from "react";
import axios from "axios";
import App from "./AdminCustomerList";
import ProdPost from "./AddProduct";
import Order from "./Orders";
import ProductUpdate from "./ProductUpdate";
import PorscheDelete from "./ProdDelete";
import Nav from "./Navbar";
function AdminPage(){
    if(localStorage.getItem("Admin") != null) {
    return(
        <>
        <Nav />
        <App/>
        <br></br>
        <ProdPost/>
        <br></br>
        <Order />
        <br></br>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>To update a product:</div>
        <ProductUpdate/>
        <br></br>
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>To delete a product:</div>
        <PorscheDelete/>
        </>
    )
    }
    else if(localStorage.getItem("Admin") == "No"){
        return (
            <>
            <h1>You are not an admin!</h1></>
        )
    }
}
export default AdminPage;