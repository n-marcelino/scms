import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import './landing.css'
import ProductShow from "./ProductShow";
import CategoryShow from "./CategoryShow";
import CustomerShow from "./CustomerShow";
import OrderShow from "./OrderShow";

export default function Home() {

    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="head-container">
                <div className="head">
                    <h2>Simple Commerce</h2>
                    <h3>Management System</h3>
                    <p>
                        A simple seller-focused platform that is made primarily with Java, Spring Framework, MySQL, and HTML/CSS/Javascript.
                    </p>
                </div>
            </div>

            <div className="d-flex flex-column px-5 pb-5 gap-5">
                <div className="text d-flex justify-content-evenly">
                    <div className="content" onClick={() => (navigate('/products'))}>
                        <h1 className="">
                            <b>Products</b>
                        </h1>
                        <p>
                            Keep in track with your inventory by visiting
                            the <b><i>Products</i></b> section. This will show the list of existing products on your inventory containing its specified I.D., its price, and the category where it belongs.
                            An add, edit, and delete function is also available for the user to modify products.
                        </p>

                        <div className="mt-auto">
                            <a className="btn btn-warning">
                                Go to products!
                            </a>
                        </div>
                    </div>

                    <div className="content" onClick={() => (navigate('/categories'))}>
                        <h1 className="">
                            <b>Categories</b>
                        </h1>
                        <p>
                            <b><i>Categories</i></b> section enables the user to distinguish
                            the different group of products whether it is a
                            clothing, electronic, or a toy item. User can also delete and add an existing category in this section.
                        </p>

                        <div className="mt-auto">
                            <a className="btn btn-warning">
                                Go to Categories!
                            </a>
                        </div>
                    </div>
                </div>

                <div className="text d-flex justify-content-evenly">
                    <div className="content" onClick={() => (navigate('/customers'))}>
                        <h1 className="">
                            <b>Customer</b>
                        </h1>
                        <p>
                            One problem dealing with customers information is to manage it in a more organized way.
                            With this system's <b><i>Customers</i></b> function, you can now easily find, update, and delete a customer information easily.
                        </p>

                        <div className="mt-auto">
                            <a className="btn btn-warning">
                                Go to Customers!
                            </a>
                        </div>
                    </div>

                    <div className="content" onClick={() => (navigate('/orders'))}>
                        <h1 className="">
                            <b>Order</b>
                        </h1>
                        <p>
                            As the user's business grows, bulk orders will make the user's mind overwhelmed. With the <b><i>Orders</i></b> Section,
                            fetching an order's information and even the
                            verifying its status (whether the order is fulfilled or not) makes the work easy.
                        </p>

                        <div className="mt-auto">
                            <a className="btn btn-warning">
                                Go to Orders!
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Routes>
                <Route exact path="/categories/*" element={<CategoryShow />} />
                <Route exact path="/products/*" element={<ProductShow />} />
                <Route exact path="/customers/*" element={<CustomerShow />} />
                <Route exact path="/orders/*" element={<OrderShow />} />
            </Routes>

        </div>
    )

}