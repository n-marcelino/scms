import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.00);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadCategories();
        if (id) {
            loadProduct();
        }
    }, [id]); // Reload product data when ID changes

    const loadProduct = () => {
        fetch(`${urlProducts}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                return response.json();
            })
            .then(data => {
                setName(data.name);
                setPrice(data.price);
                setCategoryId(data.categoryId);
            })
            .catch(error => {
                console.error('Error loading product:', error);
                // Handle error or show appropriate message to the user
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
                if (data.categories.length > 0 && !categoryId) {
                    setCategoryId(data.categories[0].id);
                }
                setCategories(data.categories);
            })
            .catch(error => {
                console.error('Error loading categories:', error);
                // Handle error or show appropriate message to the user
            });
    };

    const handleSave = () => {
        const payload = {
            id: id,
            name: name,
            price: parseFloat(price), // Ensure price is parsed as a float
            categoryId: categoryId
        };

        const method = id ? 'PUT' : 'POST'; // Use PUT for update, POST for new product

        fetch(urlProducts, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save product');
                }
                return response.json();
            })
            .then(data => {
                console.log('Product saved successfully:', data);
                alertSuccess();
                setName("");
                setPrice(0.00);
            })
            .catch(error => {
                console.error('Error saving product:', error);
                // Handle error or show appropriate message to the user
            });
    };

    const alertSuccess = () => {
        alert("Operation Successful!");
        navigate('/products');
    };

    const renderHeader = () => {
        if (id) {
            return <h1>Editing Product {id}</h1>;
        } else {
            return <h1>Add Product</h1>;
        }
    };

    return (
        <div>
            <div className="form-group w-50 p-3">
                {renderHeader()}

                <div className="form-group row py-2">
                    <label className="col-2 col-form-label">Name:</label>
                    <div className="col-10">
                        <input
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row py-2">
                    <label className="col-sm-2 col-form-label">Price:</label>
                    <div className="col-sm-10">
                        <input
                            className="form-control"
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group row py-2">
                    <label className="col-sm-2 col-form-label">Category:</label>
                    <div className="col-sm-10">
                        <select
                            className="form-control"
                            value={categoryId}
                            onChange={(event) => setCategoryId(event.target.value)}
                        >
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-4 d-flex gap-3">
                    <button
                        className="form-control btn btn-warning"
                        onClick={() => { handleSave(); }}
                    >
                        Save Product
                    </button>

                    <button
                        className="form-control btn btn-danger"
                        onClick={() => { navigate('/products'); }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductAdd;
