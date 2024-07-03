import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import '../cards.css';

const CustomerShow = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = () => {
        fetch(urlCustomers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                return response.json();
            })
            .then(data => {
                setCustomers(data); // Ensure to handle empty response gracefully
            })
            .catch(error => {
                console.error('Error loading customers:', error);
                // Handle error or show appropriate message to the user
            });
    };

    const handleDeleteCustomer = (id) => {
        const deleteUrl = `http://localhost:8080/api/customers/${id}/delete`;

        // Example using a more styled confirmation dialog
        if (window.confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if the customer has an existing order record.")) {
            fetch(deleteUrl, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete customer');
                    }
                    return response.json();
                })
                .then(data => {
                    loadCustomers();
                })
                .catch(error => {
                    console.error('Error deleting customer:', error);
                    // Handle error or show appropriate message to the user
                });
        }
    };

    const renderCustomers = () => {
        if (customers.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {customers.map((c) => (
                        <div key={c.id} className="bg-light p-5 c-card d-flex flex-column">
                            <div className="mb-4">
                                <h2>{`${c.lastName}, ${c.firstName}`}</h2>
                                <h5><b>ID: </b>{c.id}</h5>
                                <h5><b>ADDRESS: </b>{`${c.street}, ${c.city} ${c.zip}`}</h5>
                                <h5><b>Phone Number: </b>{c.phone}</h5>
                            </div>
                            <div className="mt-auto d-flex gap-2">
                                <button
                                    type="button"
                                    className="w-100 btn btn-warning"
                                    onClick={() => navigate(`/customers/form/${c.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="form-control btn btn-danger"
                                    onClick={() => handleDeleteCustomer(c.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-light c-card">
                        <div onClick={() => navigate('/customers/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
                    <h3 className="mb-4 text-danger">No Customers Found.</h3>
                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card">
                            <div onClick={() => navigate('/customers/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
            <h1>Customer Records</h1>
            <hr />
            {renderCustomers()}
        </div>
    );
};

export default CustomerShow;
