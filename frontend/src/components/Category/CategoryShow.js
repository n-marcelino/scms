import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CategoryShow = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const urlCategories = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        fetch(urlCategories)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories.');
                }
                return response.json();
            })
            .then(data => {
                console.log('Fetched categories:', data); // Log fetched data for debugging
                setCategories(data.categories || []);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
                // Optionally, handle error states here (e.g., show an error message)
            });
    };

    const handleDeleteCategory = (id) => {
        const deleteUrl = `http://localhost:8080/api/categories/${id}/delete`;

        if (window.confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if there is a product under this category.")) {
            fetch(deleteUrl, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete category.');
                    }
                    return response.json();
                })
                .then(data => {
                    loadCategories(); // Refresh categories after deletion
                })
                .catch(error => {
                    console.error('Error deleting category:', error);
                    // Optionally, handle delete errors here
                });
        }
    };

    const renderCategories = () => {
        if (categories.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {categories.map((c) => (
                        <div key={c.id} className="bg-light p-5 c-card d-flex flex-column">
                            <h2>{c.name}</h2>
                            <div className="mb-4">
                                <h5><b>ID: </b>{c.id}</h5>
                                <h5>
                                    <b>Products: </b>
                                    <ul>
                                        {c.products && c.products.map((cp) => (
                                            <li key={cp.id}>{cp.name}</li>
                                        ))}
                                    </ul>
                                </h5>
                            </div>
                            <div className="mt-auto d-flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => navigate(`/categories/form/${c.id}`)}
                                    className="w-100 btn btn-warning"
                                >
                                    Edit
                                </button>
                                <button
                                    className="form-control btn-danger"
                                    onClick={() => handleDeleteCategory(c.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-light c-card">
                        <div onClick={() => navigate('/categories/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="82"
                                height="82"
                                fill="currentColor"
                                className="bi bi-plus-circle-fill text-warning"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <h3 className="mb-4 text-danger">No Categories Found.</h3>
                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card">
                            <div onClick={() => navigate('/categories/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="82"
                                    height="82"
                                    fill="currentColor"
                                    className="bi bi-plus-circle-fill text-warning"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="p-3">
            <h1>Category List</h1>
            <hr />
            {renderCategories()}
        </div>
    );
};

export default CategoryShow;
