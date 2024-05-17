import React, { useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import './App.css'
import Cookies from "js-cookie";

axios.defaults.withCredentials = true;
export default function PorscheDelete() {
    const [id, setId] = useState(0);
    const url = "http://localhost:3001/api/products";

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const returnId=parseInt(id)
            const product={returnId}
            console.log("Return id is",returnId)
            await axios.delete(url,{data:{productId:returnId}} , { withCredentials : true});
            console.log("Product with ID ${id} deleted successfully.");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <>
            <form onSubmit={handleDelete}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Product ID</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Product ID" onChange={(e) => setId(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-danger">Delete</button>
            </form>
        </>
    );
}