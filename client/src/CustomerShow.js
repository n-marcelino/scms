import React, { useState, useEffect } from "react";

export default function CustomerShow() {

    //observable variable and function that updates variable
    const [message, setMessage] = useState(""); //string
    const [customers, setCustomers] = useState([]); //empty array
    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        loadCustomers()
    }, []); //function called only once

    function loadCustomers() {
        // Step 1: Call the urlProducts URL
        fetch(urlCustomers)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setCustomers(data.customers);
            })
            .catch((error) => {
            });
    }

    function renderCustomers() {
        if(customers.length > 0) {
            return(
                <div class="d-flex gap-3">
                    {
                        customers.map((c) => {
                            return(
                                <div class="bg-light p-5">
                                    <h2>{c.lastname + ", " + c.firstname}</h2>
                                    <h5>ID: {c.id}</h5>
                                    <h5>ADDRESS: {c.street + ", " + c.city + " " + c.zip}</h5>
                                    <h5>Phone Number: {c.phone}</h5>
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
                    No Customers Foud
                </h2>
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div>
            <h1>
                Customer Records
            </h1>

            {/* <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            />

            <div>
                a variable called message, which will be rendered
                {message}
            </div> */}

            {renderCustomers()}


        </div>
    )

}