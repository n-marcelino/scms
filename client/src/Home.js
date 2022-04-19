import React, { useState, useEffect } from "react";

export default function Home() {

    //observable variable and function that updates variable
    const [message, setMessage] = useState(""); //string
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
                <div>
                    {
                        products.map((p) => {
                            return(
                                <div>
                                    <h4>{p.name}</h4>
                                    <h5>PRICE: {p.price}</h5>
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

            <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            />

            <div>
                {/* a variable called message, which will be rendered*/}
                {message}
            </div>

            <hr/>
            {renderProducts()}


        </div>
    )
}