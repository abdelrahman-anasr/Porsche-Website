import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ProductDetails(){
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get('http://localhost:3001/get/api/products')
        .then(response => response.json())
        .then(products=> setProducts(products.data))
        .catch(err=>console.log(err)) 
    },[]);

    return(
        <div className="Products">
            <table className="table table-striped table-hover"> 
                <thead className="thead-dark"> 
                    <tr className="table-dark">
                        <th scope="col">#</th>
                        <th scope="col">Product ID:</th>
                        <th scope="col">Name:</th>
                        <th scope="col">Model:</th>
                        <th scope="col">Model Year:</th>
                        <th scope="col">Color:</th>
                        <th scope="col">Price:</th>
                    </tr>
                </thead>
                <tbody> 
                    {products.map((product, index) => 
                        <tr key={index}> 
                            <td>{index + 1}</td>
                            <td>{product.productId}</td>
                            <td>{product.name}</td>
                            <td>{product.model}</td>
                            <td>{product.modelYear}</td>
                            <td>{product.color}</td>
                            <td>{product.price}</td>
                        </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
export default ProductDetails;