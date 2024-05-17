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
        <ProdPost/>
        <Order />
        <ProductUpdate/>
        <PorscheDelete/>
        </>
    )
    }
    else if(localStorage.getItem("Admin") == "Yes"){
        return (
            <>
            <h1>You are not an admin!</h1></>
        )
    }
}
export default AdminPage;