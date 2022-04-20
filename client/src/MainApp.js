import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import Home from "./Home";
import CategoryShow from "./CategoryShow";
import CategoryAdd from "./CategoryAdd";
import ProductShow from "./ProductShow";
import ProductAdd from "./ProductAdd";
import CustomerShow from "./CustomerShow";
import CustomerAdd from "./CustomerAdd";

export default function MainApp() {
    
    const navigate = useNavigate();

    return (
        <div class="d-flex gap-2 ">
            <div class="w-25 bg-light vh-100 p-3">
                <h2>Simple Commerce Management System</h2>
                <hr></hr>
                <ul class="navbar-nav pl-5">
                    <li>
                        <a onClick={()=>(navigate('/'))}>
                            Home
                        </a>
                    </li>

                    <li>
                        <a onClick={()=>(navigate('/categories'))}>
                        Categories
                        </a>
                        <ul>
                            <li>
                                    <a onClick={()=>(navigate('/categories/add'))}>
                                        Add Category
                                    </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a onClick={()=>(navigate('/products'))}>
                            Products
                        </a>
                        <ul>
                            <li>
                                    <a onClick={()=>(navigate('/products/add'))}>
                                        Add Product
                                    </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a onClick={()=>(navigate('/customers'))}>
                            Customer Record
                        </a>
                        <ul>
                            <li>
                                    <a onClick={()=>(navigate('/customers/add'))}>
                                        Add Record
                                    </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <div class="p-3 w-75">
                <Routes>
                    <Route exact path ="/" element={<Home/>}/>
                    <Route exact path ="/categories" element={<CategoryShow/>}/>
                    <Route exact path ="/categories/add" element={<CategoryAdd/>}/>
                    <Route exact path ="/products" element={<ProductShow/>}/>
                    <Route exact path ="/products/add" element={<ProductAdd/>}/>
                    <Route exact path ="/customers" element={<CustomerShow/>}/>
                    <Route exact path ="/customers/add" element={<CustomerAdd/>}/>
                </Routes>
            </div>
            
            
        </div>
    )

}