import React, { useState, useEffect } from "react";
import {
    useNavigate
} from "react-router-dom";

export default function CategoryShow() {

    const navigate = useNavigate();

    //observable variable and function that updates variable
    const [categories, setCategories] = useState([]); //empty array
    const urlCategories = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadCategories()
    }, []); //function called only once

    function loadCategories() {
        // Step 1: Call the urlProducts URL
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setCategories(data.categories);
            })
            .catch((error) => {
            });
    }

    function closePopup() {
        var edit = document.getElementById("editing-window-container");
        edit.classList.add("d-none");
        navigate('/categories');

    }

    function handleDeleteCategory(id) {
        var deleteUrl = `http://localhost:8080/api/categories/${id}/delete`;

        if (confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if there is a product under this category.") == true) {
            fetch(deleteUrl)
                .then(response => response.json())
                .then(data => {
                    loadCategories();
                })
                .catch((error) => {
                });
        } 
    }

    function renderCategories() {

        if (categories.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {
                        categories.map((c) => {
                            return (
                                <div className="bg-light p-5 c-card d-flex flex-column">
                                    <h2>{c.name}</h2>
                                    <div className="mb-4">
                                        <h5>ID: {c.id}</h5>
                                    </div>
                                    <div className="mt-auto d-flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => { navigate('/categories/:id'); }}
                                            className="w-100 btn btn-warning">
                                            Edit
                                        </button>

                                        <button
                                            className="form-control btn-danger"
                                            onClick={() => { handleDeleteCategory(c.id) }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className="bg-light c-card" >
                        <div onClick={() => (navigate('/categories/add'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
                        No Categories Found.
                    </h3>

                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card" >
                            <div onClick={() => (navigate('/categories/add'))} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
                Category List
            </h1>

            <hr />

            {renderCategories()}

        </div>
    )

}