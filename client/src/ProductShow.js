import React, { useState, useEffect } from "react";

export default function ProductShow() {

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
                <div class="d-flex flex-wrap gap-3">
                    {
                        products.map((p) => {
                            return(
                                <div class="bg-light p-5">
                                    <h2>{p.name}</h2>
                                    <h5>ID: {p.id}</h5>
                                    <h5>PRICE: {p.price}</h5>
                                    <h5>CATEGORY: {p.category}</h5>
                                    <div class="d-flex gap-1 pt-4">
                                        <button type="button" class="w-100 btn btn-warning">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <h2>
                    No Products Foud
                </h2>
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div>
            <h1>
                My List of Products
            </h1>

            {/* <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            /> */}

            {renderProducts()}


        </div>
    )

}