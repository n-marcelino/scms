import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderShow = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const urlOrders = "http://localhost:8080/api/orders";
    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        loadOrders();
        loadCustomers();
    }, []);

    const loadOrders = () => {
        fetch(urlOrders)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then(data => {
                setOrders(data.orders || []); // Ensure to handle empty response gracefully
            })
            .catch(error => {
                console.error('Error loading orders:', error);
                // Handle error or show appropriate message to the user
            });
    };

    const loadCustomers = () => {
        fetch(urlCustomers)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch customers');
                }
                return response.json();
            })
            .then(data => {
                setCustomers(data.customers || []); // Ensure to handle empty response gracefully
            })
            .catch(error => {
                console.error('Error loading customers:', error);
                // Handle error or show appropriate message to the user
            });
    };

    const handleDeleteOrder = (id) => {
        const deleteUrl = `http://localhost:8080/api/orders/${id}/delete`;

        // Example using a custom confirmation dialog (replace with your preferred modal library)
        if (window.confirm("Danger Zone! Do you wish to delete this entry?\r\n\r\nNote: Deletion may fail if order has existing products. Please first remove the products under this order.")) {
            fetch(deleteUrl, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to delete order');
                    }
                    return response.json();
                })
                .then(data => {
                    loadOrders(); // Refresh the order list after deletion
                })
                .catch(error => {
                    console.error('Error deleting order:', error);
                    // Handle error or show appropriate message to the user
                });
        }
    };

    const getOrderStatus = (o) => {
        return o.isOrderFulfilled ? "✅" : "❌";
    };

    const renderOrders = () => {
        if (orders.length > 0) {
            return (
                <div className="d-flex flex-wrap gap-3 cc-container">
                    {orders.map((o) => (
                        <div key={o.id} className="bg-light p-5 c-card d-flex flex-column">
                            <div className="mb-4">
                                <h2>Order #{o.id}</h2>
                                <h5><b>Customer:</b> {o.customer}</h5>
                                <h5><b>Order Status:</b> {getOrderStatus(o)}</h5>
                                <h5>
                                    <b>Products:</b>
                                    <ul>
                                        {o.products.map((op, index) => (
                                            <li key={index}>{" (" + op.quantity + "x) " + op.product}</li>
                                        ))}
                                    </ul>
                                </h5>
                            </div>
                            <div className="mt-auto d-flex gap-2">
                                <button
                                    type="button"
                                    className="w-100 btn btn-warning"
                                    onClick={() => navigate(`/orders/update/${o.id}`)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="form-control btn btn-danger"
                                    onClick={() => handleDeleteOrder(o.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="bg-light c-card">
                        <div onClick={() => navigate('/orders/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
                    <h3 className="mb-4 text-danger">No Orders Found.</h3>
                    <div className="d-flex flex-wrap gap-3 cc-container">
                        <div className="bg-light c-card">
                            <div onClick={() => navigate('/orders/form')} className="btn h-100 w-100 d-flex align-items-center justify-content-center">
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
            <h1>Order Records</h1>
            <hr />
            {renderOrders()}
        </div>
    );
};

export default OrderShow;
