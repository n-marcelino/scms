import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import ProductAdd from "./ProductAdd";

export default function ProductShow() {

    const navigate = useNavigate();

    //observable variable and function that updates variable
    const [products, setProducts] = useState([]); //empty array
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadProducts()
    }, []); //function called only once

    function loadProducts() {
        // Step 1: Call the urlProducts URL
        fetch(urlProducts)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setProducts(data.products);
            })
            .catch((error) => {
            });
    }

    function renderProducts() {
        if(products.length > 0) {
            return(
                <div class="d-flex flex-wrap gap-3 cc-container">
                    {
                        products.map((p) => {
                            return(
                                <div class="bg-light p-5 c-card d-flex flex-column">
                                    <div class="mb-4">
                                        <h2>{p.name}</h2>
                                        <h5>ID: {p.id}</h5>
                                        <h5>PRICE: {p.price}</h5>
                                        <h5>CATEGORY: {p.category}</h5>
                                    </div>
                                    <div class="mt-auto">
                                        <button type="button" class="w-100 btn btn-warning">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div class="bg-light c-card" >
                        <div onClick={()=>(navigate('/products/add'))} class="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="82 " 
                                    height="82" 
                                    fill="currentColor" 
                                    class="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                </svg>
                            </div>                            
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <h3 class="mb-5 text-danger">
                        No Products Found.
                    </h3>

                    <div class="d-flex flex-wrap gap-3 cc-container">
                        <div class="bg-light c-card" >
                            <div onClick={()=>(navigate('/products/add'))} class="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="82 " 
                                        height="82" 
                                        fill="currentColor" 
                                        class="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </div>                            
                            </div>
                        </div>
                    </div>
                </div>
                    
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div class="p-3">
            <h1>
                My List of Products
            </h1>

            {/* <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            /> */}

            {renderProducts()}

            <Routes>
                <Route exact path ="/add" element={<ProductAdd/>}/>
            </Routes>

        </div>
    )

}