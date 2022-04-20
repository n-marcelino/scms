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
import CategoryUpdate from "./CategoryUpdate";
import CategoryDelete from "./CategoryDelete";
import ProductShow from "./ProductShow";
import ProductAdd from "./ProductAdd";
import ProductUpdate from "./ProductUpdate";
import ProductDelete from "./ProductDelete";
import CustomerShow from "./CustomerShow";
import CustomerAdd from "./CustomerAdd";
import CustomerUpdate from "./CustomerUpdate";
import CustomerDelete from "./CustomerDelete";

export default function MainApp() {
    
    const navigate = useNavigate();

    return (
        <div class="d-flex">
            <div class="cc-side-nav w-25 bg-light vh-100 p-3">
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
                        <ul>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/categories/add'))}>
                                    Add Category
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/categories/update'))}>
                                    Update Category
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/categories/delete'))}>
                                    Delete Category
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/products'))}>
                            Products
                        </a>
                        <ul>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/products/add'))}>
                                    Add Product
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/products/update'))}>
                                    Update Product
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/products/delete'))}>
                                    Delete Product
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link link-warning" onClick={()=>(navigate('/customers'))}>
                            Customer Record
                        </a>
                        <ul>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/customers/add'))}>
                                    Add Record
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/customers/update'))}>
                                    Update Record
                                </a>
                            </li>
                            <li>
                                <a class="nav-link link-warning" onClick={()=>(navigate('/customers/delete'))}>
                                    Delete Record
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
            
            <div class="w-75">

                <div class="p-3">
                    <Routes>
                        <Route exact path ="/" element={<Home/>}/>
                        <Route exact path ="/categories" element={<CategoryShow/>}/>
                        <Route exact path ="/categories/add" element={<CategoryAdd/>}/>
                        <Route exact path ="/categories/update" element={<CategoryUpdate/>}/>
                        <Route exact path ="/categories/delete" element={<CategoryDelete/>}/>
                        <Route exact path ="/products" element={<ProductShow/>}/>
                        <Route exact path ="/products/add" element={<ProductAdd/>}/>
                        <Route exact path ="/products/update" element={<ProductUpdate/>}/>
                        <Route exact path ="/products/delete" element={<ProductDelete/>}/>
                        <Route exact path ="/customers" element={<CustomerShow/>}/>
                        <Route exact path ="/customers/add" element={<CustomerAdd/>}/>
                        <Route exact path ="/customers/update" element={<CustomerUpdate/>}/>
                        <Route exact path ="/customers/delete" element={<CustomerDelete/>}/>

                    </Routes>
                </div>
            </div>
            
            
        </div>
    )

}