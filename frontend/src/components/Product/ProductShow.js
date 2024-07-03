import React, { useState, useEffect } from "react";
import {
    useNavigate
} from "react-router-dom";

export default function ProductShow() {

    const navigate = useNavigate();

    //observable variable and function that updates variable
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

    function handleDeleteProduct(id) {
        var deleteUrl = `http://localhost:8080/api/products/${id}/delete`;

        if (confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if there is an order containing this product.") == true) {
            fetch(deleteUrl)
                .then(response => response.json())
                .then(data => {
                    loadProducts();
                })
                .catch((error) => {
                });
        }
    }
    function renderProducts() {
        if (products.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {
                        products.map((p) => {
                            return (
                                <div className="bg-light p-5 c-card d-flex flex-column">
                                    <div className="mb-4">
                                        <h2>{p.name}</h2>
                                        <h5><b>ID: </b>{p.id}</h5>
                                        <h5><b>PRICE: </b>{p.price}</h5>
                                        <h5><b>CATEGORY: </b>{p.category}</h5>
                                    </div>
                                    <div className="mt-auto d-flex gap-2">
                                        <button
                                            type="button"
                                            className="w-100 btn btn-warning"
                                            onClick={() => { navigate(`/products/form/${p.id}`); }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="form-control btn-danger"
                                            onClick={() => { handleDeleteProduct(p.id) }}
                                        >
                                            Delete
                                        </button>

                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="bg-light c-card" >
                        <div onClick={() => (navigate('/products/form'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="82 "
                                    height="82"
                                    fill="currentColor"
                                    className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                </div>
            )
        } else {
            return (
                <div>
                    <h3 className="mb-4 text-danger">
                        No Products Found.
                    </h3>

                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card" >
                            <div onClick={() => (navigate('/products/form'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="82 "
                                        height="82"
                                        fill="currentColor"
                                        className="bi bi-plus-circle-fill text-warning" viewBox="0 0 16 16"
                                    >
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
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
        <div className="p-3">
            <h1>
                My List of Products
            </h1>

            <hr />

            {renderProducts()}

        </div>
    )

}