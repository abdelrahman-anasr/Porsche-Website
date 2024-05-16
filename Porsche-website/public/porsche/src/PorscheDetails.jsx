import './App.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function ProductDetails(){
    const url="http://localhost:3001/api/products"
    const [data,setProducts]=useState([]);
    const[error,setError]=useState(null);
    const fetchInfo=async()=>{
        try{
            const res=await axios.get(url);
            setProducts(res.data);
            console.log(res.data);
        }catch(err){
            setError(err.message);
            console.error(err);
        }
    };
    useEffect(()=>{
        fetchInfo();
    },[]);

    return(
        <div className="Products">
            <div class="container1">
            <div class="row">
            {data.map(data => 
                <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <img class="card-img-top" src={data.url} alt="Thumbnail [100%x225]" style={{height: "225px" , width: "100%" , display: "block"}} data-holder-rendered="true" />
                  <div class="overlayingText">
                    <p class="card-text" style={{fontFamily: "porscheFont", color: "#EBD698", fontSize: "18px", marginBottom: "1%", marginLeft: "0%", textAlign: "center"}}>{data.name}</p>
                      <p class="card-text" style={{fontFamily: "porscheFont", color: "white", fontSize: "14px",marginBottom: "0%", textAlign: "center"}}>{data.price}</p>
                      <div class="btn-group" style={{position: "absolute", left: "27.5%", bottom: "18%"}}>
                        <button type="button" class="btn btn-dark" style={{fontFamily: "porscheFont"}}>Check it Out</button>
                      </div>
                    </div>
                </div>
              </div>
            )}
            </div>
            </div>
        </div>
    );
}
export default ProductDetails;