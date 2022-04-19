import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import Home from "./Home";
import CategoryAdd from "./CategoryAdd";
import ProductShow from "./ProductShow";
import ProductAdd from "./ProductAdd";

export default function MainApp() {
    
    const navigate = useNavigate();

    return (
        <div>
            <h1>Simple Commerce Management System</h1>
            <ul>
                <li>
                    <a onClick={()=>(navigate('/'))}>
                        Home
                    </a>
                </li>

                <li>
                    <a onClick={()=>(navigate('/categories/add'))}>
                        Categories
                    </a>
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
                
            </ul>

            <hr></hr>

            <Routes>
                <Route exact path ="/" element={<Home/>}/>
                <Route exact path ="/categories/add" element={<CategoryAdd/>}/>
                <Route exact path ="/products" element={<ProductShow/>}/>
                <Route exact path ="/products/add" element={<ProductAdd/>}/>
            </Routes>
        </div>
    )

}