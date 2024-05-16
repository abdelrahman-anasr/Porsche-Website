import React from "react";
import { Button } from "react-bootstrap";
import './App.css'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";



export default function ProdPost(){

const [name, setName] = useState("");
const [model, setModel] = useState("");
const [model_year, setModelYear] = useState("");
const [color, setColor] = useState("");
const [price, setPrice] = useState("");
const [id, setId] = useState("");


const nameUpdate = (e) => {

  setName(e.target.value);

}

const modelUpdate = (e) => {
  
    setModel(e.target.value);
  
}

const modelYearUpdate = (e) => {

  setModelYear(e.target.value);

}

const colorUpdate = (e) => {

  setColor(e.target.value);

}

const priceUpdate = (e) => {

  setPrice(e.target.value);

}
const IdUpdate = (e) => {

    setId(e.target.value);

}
const handleSubmit=()=> {
  const postURL = "http://localhost:3001/api/products"
  fetch(postURL, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
          name: name,
          model: model,
          model_year: model_year,
          color: color,
          price: price,
          productId: id
      })
  })
  .then(()=>{

      alert('You have been added to the system!');
  })
}



return(
<div className="form-div">
<div className="container">
  <h2>Add Product</h2>
  <form className="form-horizontal" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="control-label col-sm-2">Name</label>
      <div className="col-sm-10">
        <input type="name" required onChange={nameUpdate} className="form-control" id="name" placeholder="Enter name" name="name"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2">Model</label>
      <div className="col-sm-10">
        <input type="model" required onChange={modelUpdate} className="form-control" id="model" placeholder="Enter Model" name="model"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2">Model Year:</label>
      <div className="col-sm-10 mb-2">          
        <input type="model_year" required onChange={modelYearUpdate} className="form-control" id="model_year" placeholder="Enter Model Year" name="model_year"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2">Color:</label>
      <div className="col-sm-10 mb-2">          
        <input type="text_color" required onChange={colorUpdate} className="form-control" id="color" placeholder="Enter Color" name="color"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2" htmlFor="pwd">Price:</label>
      <div className="col-sm-10 mb-2">          
        <input type="price" required onChange={priceUpdate} className="form-control" id="price" placeholder="Enter Price" name="price"/>
      </div>
    </div>
    <div className="form-group">
      <label className="control-label col-sm-2">Product ID:</label>
      <div className="col-sm-10 mb-2">          
        <input type="id" required onChange={IdUpdate} className="form-control" id="productId" placeholder="Enter id" name="productId"/>
      </div>
    </div>
    <div className="form-group">        
      <div className="col-sm-offset-2 col-sm-10">
      <button type="number" className="btn btn-primary">Add Product</button>
      </div>
    </div>
  </form>
</div>
</div>
);

}