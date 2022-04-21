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
        <div class="d-flex">
            <div class="cc-side-nav w-25 bg-light vh-100 p-3 position-block">
                {/* dont remove, this is here to push the rest of the body to the side */}
            </div>

            <div class="cc-side-nav w-25 bg-light vh-100 p-3 position-fixed">
                <h2>Simple Commerce Management System</h2>
                <hr></hr>
                <ul class="navbar-nav pl-5">
                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/'))}>
                            Home
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/categories'))}>
                        Categories
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/products'))}>
                            Products
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/customers'))}>
                            Customer Record
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="flex-grow-1 w-75">
                <div>
                    {/* dont remove the adds from here even if theres adds in the shows,
                    for some reason it breaks if the adds dont exist here */}
                    <Routes>
                        <Route exact path ="/" element={<Home/>}/>
                        <Route exact path ="/categories/*" element={<CategoryShow/>}/>
                        <Route exact path ="/categories/add" element={<CategoryAdd/>}/>
                        <Route exact path ="/products/*" element={<ProductShow/>}/>
                        <Route exact path ="/products/add" element={<ProductAdd/>}/>
                        <Route exact path ="/customers/*" element={<CustomerShow/>}/>
                        <Route exact path ="/customers/add" element={<CustomerAdd/>}/>
                    </Routes>
                </div>
            </div>
            
            
        </div>
    )

}