import React, { useEffect , useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import './App.css'



export default function ProductUpdate() {
    const [name , setName] = useState("")
    const [id , setId] = useState(1)
    const url = "http://localhost:3001/api/products"
    const HandleSubmit = async (e) => {
        e.preventDefault();
        const returnId = parseInt(id)
        console.log(parseInt(id))
        const product = {returnId, name}
        await axios.patch(url, {productId : returnId , name : product.name})
    }
    return (
        <>
        <form onSubmit={HandleSubmit}>
            <div class="form-group">
                <label for="exampleInputEmail1">Product ID</label>
                <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"  onChange={(e) => setId(e.target.value)}/>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Name</label>
                <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Porsche Car Name" onChange={(e) => setName(e.target.value)}/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </>
    )
}