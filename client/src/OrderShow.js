import React, { useState, useEffect } from "react";

export default function OrderShow() {

    //observable variable and function that updates variable
    const [message, setMessage] = useState(""); //string
    const [orders, setOrders] = useState([]); //empty array

    const urlOrders = "http://localhost:8080/api/orders";
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadOrders()
    }, []); //function called only once

    function loadOrders() {
        // Step 1: Call the urlProducts URL
        fetch(urlOrders)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setOrders(data.orders);
            })
            .catch((error) => {
            });
    }

    function renderOrders() {
        if (products.length > 0) {
            return (
                <div>
                    {
                        orders.map((o) => {
                            return (
                                <div>
                                    <h2>Order #{o.id}</h2>
                                    <h5>Customer: {o.customer.getLastName() + ", " + o.customer.getFirstName()}</h5>
                                    <h5>Products: {o.products}</h5>
                                    <h5>Order date: {o.orderDate}</h5>
                                    <h5>Is Order Fulfilled?: {o.isOrderFulfilled}</h5>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <h2>
                    No Orders Found
                </h2>
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div>
            <h1>
                Order Record
            </h1>

            {/* <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            /> */}

            <div>
                {/* a variable called message, which will be rendered*/}
                {message}
            </div>

            {renderOrders()}


        </div>
    )

}