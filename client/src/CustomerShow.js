import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import CustomerAdd from "./CustomerAdd";

export default function CustomerShow() {

    const navigate = useNavigate();

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
                <div classsName="d-flex flex-wrap gap-3 cc-container">
                    {
                        customers.map((c) => {
                            return(
                                <div classsName="bg-light p-5 c-card d-flex flex-column">
                                    <div classsName="mb-4">
                                        <h2>{c.lastname + ", " + c.firstname}</h2>
                                        <h5>ID: {c.id}</h5>
                                        <h5>ADDRESS: {c.street + ", " + c.city + " " + c.zip}</h5>
                                        <h5>Phone Number: {c.phone}</h5>
                                    </div>
                                    <div classsName="mt-auto">
                                        <button type="button" classsName="w-100 btn btn-warning">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div classsName="bg-light c-card" >
                        <div onClick={()=>(navigate('/customers/add'))}classsName="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    width="82 " 
                                    height="82" 
                                    fill="currentColor" 
                                    classsName="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
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
                    <h3 classsName="mb-5 text-danger">
                        No Customers Found.
                    </h3>

                    <div classsName="d-flex flex-wrap gap-3 cc-container">
                        <div classsName="bg-light c-card" >
                            <div onClick={()=>(navigate('/customers/add'))} classsName="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        width="82 " 
                                        height="82" 
                                        fill="currentColor" 
                                        classsName="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
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
        <div classsName="p-3">
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

            <Routes>
                <Route exact path ="/customers/add" element={<CustomerAdd/>}/>
            </Routes>

        </div>
    )

}