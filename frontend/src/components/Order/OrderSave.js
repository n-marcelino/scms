import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OrderSave = () => {
    const navigate = useNavigate();

    const [orderItems, setOrderItems] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [products, setProducts] = useState([]);
    const [isOrderFulfilled, setIsOrderFulfilled] = useState(false);

    const urlCustomers = "http://localhost:8080/api/customers";
    const urlProducts = "http://localhost:8080/api/products";
    const urlOrders = "http://localhost:8080/api/orders";

    useEffect(() => {
        loadCustomers();
        loadProducts();
    }, []); // Load customers and products on component mount

    const loadCustomers = () => {
        fetch(urlCustomers)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    setCustomerId(data[0].id);
                }
                setCustomers(data);
            })
            .catch(error => {
                console.error('Error loading customers:', error);
            });
    };

    const loadProducts = () => {
        fetch(urlProducts)
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
            .catch(error => {
                console.error('Error loading products:', error);
            });
    };

    const handleSave = () => {
        const payload = {
            customerId: customerId,
            orderItems: orderItems,
            isOrderFulfilled: isOrderFulfilled ? 1 : 0  // Convert boolean to integer
        };

        fetch(urlOrders, {
            method: 'POST',
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
                console.log('Order saved successfully:', data);
                alertSuccess();
            })
            .catch(error => {
                console.error('Error saving order:', error);
            });
    };

    const handleProductChanged = (index, value) => {
        const updatedItems = [...orderItems];
        const selectedProduct = products.find(p => p.id === value);
        updatedItems[index].productId = value;
        updatedItems[index].price = selectedProduct ? selectedProduct.price * updatedItems[index].quantity : 0.00; // Update price based on selected product and quantity
        setOrderItems(updatedItems);
    };

    const handleQuantityChange = (index, value) => {
        const updatedItems = [...orderItems];
        const newQuantity = Math.max(parseInt(value), 1); // Ensure quantity is at least 1
        updatedItems[index].quantity = newQuantity;
        const selectedProduct = products.find(p => p.id === updatedItems[index].productId);
        updatedItems[index].price = selectedProduct ? selectedProduct.price * newQuantity : 0.00; // Calculate price based on quantity and selected product price
        setOrderItems(updatedItems);
    };

    const removeItem = (index) => {
        const updatedItems = [...orderItems];
        updatedItems.splice(index, 1);
        setOrderItems(updatedItems);
    };

    const renderOrderItems = () => {
        if (orderItems.length === 0) {
            return (
                <div>No items have been added to this order yet.</div>
            );
        } else {
            return orderItems.map((o, index) => (
                <div key={index} className="form-group">
                    <div className="d-flex align-items-center">
                        <h5>Item {o.index}</h5>
                        <button
                            className="form-control btn btn-danger ms-auto px-5"
                            onClick={() => removeItem(index)}
                        >
                            Delete
                        </button>
                    </div>
                    <div className="form-group row py-1">
                        <label className="col-sm-2 col-form-label">Product:</label>
                        <div className="col-sm-10">
                            <select
                                className="form-control"
                                value={o.productId}
                                onChange={(event) => handleProductChanged(index, event.target.value)}
                            >
                                {products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} (PHP {p.price})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group row py-1 pb-3">
                        <label className="col-sm-2 col-form-label">Price:</label>
                        <div className="col-sm-4">
                            <input
                                className="form-control"
                                value={o.price.toFixed(2)} // Display formatted price
                                readOnly // Make the input read-only
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">Quantity:</label>
                        <div className="col-sm-4">
                            <input
                                type="number"
                                className="form-control"
                                value={o.quantity}
                                min="1" // Set minimum quantity
                                onChange={(event) => handleQuantityChange(index, event.target.value)}
                            />
                        </div>
                    </div>
                </div>
            ));
        }
    };

    const addOrderItem = () => {
        const index = orderItems.length;
        const defaultProduct = products.length > 0 ? products[0] : { id: '', price: 0.00 };
        const orderItem = {
            productId: defaultProduct.id,
            price: defaultProduct.price, // Initialize with product's default price
            quantity: 1, // Default quantity to 1
            index: index
        };
        setOrderItems([...orderItems, orderItem]);
    };


    const alertSuccess = () => {
        alert("Operation Successful!");
        navigate('/orders/');
    };

    return (
        <div className="form-group w-50 p-3">
            <h1>Add Order</h1>
            <div className="form-group row py-2">
                <label className="col-sm-2 col-form-label">Customer:</label>
                <div className="col-sm-10">
                    <select
                        className="form-control"
                        value={customerId}
                        onChange={(event) => setCustomerId(event.target.value)}
                    >
                        {customers.map(c => (
                            <option key={c.id} value={c.id}>{c.lastName}, {c.firstName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group row py-2">
                <label className="col-sm-4 col-form-label">Is The Order Fulfilled?:</label>
                <div className="col-sm-8">
                    <div className="form-check">
                        <input
                            required
                            className="form-check-input"
                            type="radio"
                            id="checkTrue"
                            value="true"
                            checked={isOrderFulfilled === true}
                            onChange={(event) => setIsOrderFulfilled(event.target.value === 'true')}
                        />
                        <label className="form-check-label" htmlFor="checkTrue">True</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="checkFalse"
                            value="false"
                            checked={isOrderFulfilled === false}
                            onChange={(event) => setIsOrderFulfilled(event.target.value === 'false')}
                        />
                        <label className="form-check-label" htmlFor="checkFalse">False</label>
                    </div>
                </div>
            </div>
            <div>
                {renderOrderItems()}
                <button
                    className="form-control btn btn-warning"
                    onClick={addOrderItem}
                >
                    Add Order Item
                </button>
            </div>
            <div className="pt-4 d-flex gap-3">
                <button
                    className="form-control btn btn-warning"
                    onClick={() => { handleSave(); alertSuccess(); }}
                >
                    Add New Order
                </button>
                <button
                    className="form-control btn btn-danger"
                    onClick={() => navigate('/orders/')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default OrderSave;
