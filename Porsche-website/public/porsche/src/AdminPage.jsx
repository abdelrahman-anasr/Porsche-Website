import { Button } from "react-bootstrap";
import './App.css'
import React, { useEffect,useState } from "react";
import axios from "axios";
import App from "./AdminCustomerList";
import ProdPost from "./AddProduct";
import Order from "./Orders";

function AdminPage(){
    return(
        <>
        <App/>
        <ProdPost/>
        <Order />
        </>
    )
}
export default AdminPage;