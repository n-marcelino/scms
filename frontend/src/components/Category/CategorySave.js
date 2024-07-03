import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CategorySave = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState("");
    const urlCategories = "http://localhost:8080/api/categories";

    useEffect(() => {
        if (id) {
            loadCategories();
        }
    }, [id]);

    const loadCategories = () => {
        fetch(`${urlCategories}/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setName(data.name);
            })
            .catch(error => {
                console.error('Error loading category:', error);
            });
    };

    const renderHeader = () => {
        return (
            <h1>
                {id ? `Editing Category ${id}` : "Add Category"}
            </h1>
        );
    };

    const handleSave = () => {
        const payload = {
            id: id,
            name: name
        };

        fetch(urlCategories, {
            method: id ? 'PUT' : 'POST', // Use PUT for update, POST for create
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data); // Log response data
                setName(""); // Clear input after successful save
                alertSuccess(); // Show success message and navigate
            })
            .catch(error => {
                console.error('Error saving category:', error);
                // Handle error, show user-friendly message if needed
            });
    };

    const alertSuccess = () => {
        alert("Operation Successful!");
        navigate('/categories/');
    };

    return (
        <div className="form-group w-50 p-3">
            {renderHeader()}

            <div className="form-group row py-2">
                <label className="col-2 col-form-label">
                    Name:
                </label>
                <div className="col-10">
                    <input
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
            </div>

            <div className="pt-4 d-flex gap-3">
                <button
                    className="form-control btn-warning"
                    onClick={() => {
                        handleSave();
                    }}
                >
                    Save Category
                </button>

                <button
                    className="form-control btn-danger"
                    onClick={() => {
                        navigate('/categories/');
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CategorySave;
