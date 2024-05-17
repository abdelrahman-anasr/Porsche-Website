import React from "react";
import { Button } from "react-bootstrap";
import './App.css'
import Nav from "./Navbar";
import axios from "axios";
import { useState } from 'react';
import OrderSuccessModal from "./OrderSuccessModal";


export default function Car5(){
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
        const productId = 5
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
                <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="https://www.hdwallpapers.in/download/porsche_718_cayman_style_edition_2023_car_4k_hd_cars-HD.jpgK-2Xv3pr2bCZpiukGD6buOIzE6zw&s" alt="..." /></div>
                <div class="col-md-6">
                    <h1 class="display-5 fw-bolder">Porsche 718</h1>
                    <div class="fs-5 mb-5">
                        <span><b>$97,000</b></span><br />
                        <span>
                            The Porsche 718 lineup consists of agile sports cars celebrated for their dynamic performance, sleek design, and cutting-edge engineering, delivering an exhilarating driving experience that embodies Porsche's legacy of excellence.</span>
                    </div>
                    <p class="lead"></p>
                    <div class="d-flex">
                        <button class="btn btn-outline-dark flex-shrink-0" type="button" onClick={handlePurchase}>
                            <i class="bi-cart-fill me-1"></i>
                            Purchase
                        </button>
                        <OrderSuccessModal showModal={showModal} closeModal={closeModal} />
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
    )


};