import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../cards.css';

const ProductShow = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const urlProducts = "http://localhost:8080/api/products";
    const urlCategories = "http://localhost:8080/api/categories"; 

    useEffect(() => {
        loadProducts();
        loadCategories(); 
    }, []);

    const loadProducts = () => {
        fetch(urlProducts)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data || []);
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    };

    const loadCategories = () => {
        fetch(urlCategories)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch categories');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data || []);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
            });
    };

    const handleDeleteProduct = (id) => {
        const deleteUrl = `http://localhost:8080/api/products/${id}/delete`;

        if (window.confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if there is an order containing this product.")) {
            fetch(deleteUrl, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete product');
                    }
                    return response.json();
                })
                .then(data => {
                    loadProducts();
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                    // Handle error or show appropriate message to the user
                });
        }
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.name : 'Unknown Category';
    };

    const renderProducts = () => {
        if (products.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {products.map((p) => (
                        <div key={p.id} className="bg-light p-5 c-card d-flex flex-column">
                            <div className="mb-4">
                                <h2>{p.name}</h2>
                                <h5><b>ID: </b>{p.id}</h5>
                                <h5><b>PRICE: </b>{p.price}</h5>
                                <h5><b>CATEGORY: </b>{getCategoryName(p.categoryId)}</h5> {}
                            </div>
                            <div className="mt-auto d-flex gap-2">
                                <button
                                    type="button"
                                    className="w-100 btn btn-warning"
                                    onClick={() => navigate(`/products/form/${p.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="form-control btn btn-danger"
                                    onClick={() => handleDeleteProduct(p.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-light c-card">
                        <div onClick={() => navigate('/products/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                            <div>
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
        } else {
            return (
                <div>
                    <h3 className="mb-4 text-danger">No Products Found.</h3>
                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card">
                            <div onClick={() => navigate('/products/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
                                <div>
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
                </div>
            );
        }
    };

    return (
        <div className="p-3">
            <h1>My List of Products</h1>
            <hr />
            {renderProducts()}
        </div>
    );
};

export default ProductShow;
