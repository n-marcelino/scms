import React, { useState, useEffect } from "react";
import './landing.css'

export default function Home() {

    return (
        <div className="home">
            <div className="head-container">
                <div className="head">
                    <h2>Simple Commerce</h2>
                    <h3>Management System</h3>
                    <p>A simple seller-focused platform that is made primarily with Java, Spring Framework, MySQL, and HTML/CSS/Javascript.</p>
                </div>
            </div>
            <div className="text-container">
                    <h1>Products</h1>
                    <p>Keep in track with your inventory by visiting 
                        the <b><i>Products</i></b> function. This will show the list of existing products on your inventory containing its specified I.D., its price, and the category where it belongs.
                        An add, edit, and delete function is also available for the user to modify products.
                    </p>
            </div>

            <div className="text-container-2">
                    <h1>Categories</h1>
                    <p> <b><i>Categories</i></b> section enables the user to distinguish 
                        the different group of products whether it is a 
                        clothing, electronic, or a toy item. User can also delete and add an existing category in this section. 
                    </p>
            </div>

            <div className="text-container-3">
            <h1>Customer</h1>
                <p> One problem dealing with customers information is to manage it in a more organized way.
                    With this system's <b><i>Customers</i></b> function, you can now easily find, update, and delete a customer information easily.
                </p>
            </div>

            <div className="text-container-4">
            <h1>Order</h1>
                <p> As the user's business grows, bulk orders will make the user's mind overwhelmed. With the <b><i>Orders</i></b> Section, 
                    fetching an order's information and even the 
                    verifying its status (whether the order is fulfilled or not) makes the work easy.
                </p>
            </div>
        </div>

    )
    
}
