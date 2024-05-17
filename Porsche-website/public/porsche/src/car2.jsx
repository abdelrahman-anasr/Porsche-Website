import React from "react";
import { Button } from "react-bootstrap";
import './App.css'
import Nav from "./Navbar";
import axios from "axios";
import OrderSuccessModal from './OrderSuccessModal';
import { useState } from 'react';


export default function Car2(){
    const url = "http://localhost:3001/orders"
    const [showModal, setShowModal] = useState(false);

    const closeModal = () => { 
        setShowModal(false);
    }

    const handlePurchase = async (event) => {
        console.log("yay")
        event.preventDefault();
        const orderId = 1;
        const data = Date.now();
        const productId = 2
        const email = localStorage.getItem("Email")
        const postVal = {orderId : orderId , productId : productId , user_email : email , order_date : data};
        await axios.post(url, postVal)
        console.log("Submitted")
        setShowModal(true);
    }
    return(
        <>
        <Nav />
        <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="https://images.alphacoders.com/118/1182622.jpg" alt="..." /></div>
                <div class="col-md-6">
                    <h1 class="display-5 fw-bolder">Porsche Macan</h1>
                    <div class="fs-5 mb-5">
                        <span><b>$80,400</b></span><br />
                        <span>The Porsche Macan is a dynamic luxury compact SUV that combines sporty performance, versatile practicality, and the premium quality synonymous with the Porsche brand.</span>
                        <hr />
                    </div>
                    <p class="lead"></p>
                    <div class="d-flex">
                        <form >
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" onClick={handlePurchase}>
                            <i class="bi-cart-fill me-1"></i>
                            Purchase
                        </button>
                        <OrderSuccessModal showModal={showModal} closeModal={closeModal} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    )


};