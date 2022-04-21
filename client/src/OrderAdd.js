import React, { useState, useEffect } from "react";

export default function OrderAdd() {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState("");
    const [isOrderFulfilled, setIsOrderFulfilled] = useState(false);

    const urlCustomers = "http://localhost:8080/api/customers";
    const urlProducts = "http://localhost:8080/api/products";
    const urlOrders = "http://localhost:8080/api/orders";

    useEffect(() => {
        loadCustomers();
        loadProducts();
    }, []); //function called only once

    function loadCustomers() {
        fetch(urlCustomers)
            .then(response => response.json())
            .then(data => {
                if (data.customers.length > 0) {
                    setCustomerId(data.customers[0].id)
                }
                setCustomers(data.customers);
            })
            .catch((error) => {
            });
    }

    function loadProducts() {
        fetch(urlProducts)
            .then(response => response.json())
            .then(data => {
                if (data.products.length > 0) {
                    setProductId(data.products[0].id)
                }
                setProducts(data.products);
            })
            .catch((error) => {
            });
    }

    function handleSave() {
        console.log("customerId: " + customerId);
        console.log("productId: " + productId);
        console.log("isOrderFulfilled" + isOrderFulfilled);

        var payload = {
            customerId: customerId,
            productId: productId,
            isOrderFulfilled: isOrderFulfilled
        }

        fetch(urlOrders,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(response);
                setName("");
                setPrice(0.00);
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <div class="form-group w-50 p-3">
                <h1>Add Order</h1>

                <div class="form-group row py-2">
                    <label class="col-sm-2 col-form-label">
                        Customer:
                    </label>
                    <div class="col-sm-10">
                        <select
                            class="form-control"
                            value={customerId}
                            onChange={(event) => { setCustomerId(event.target.value) }}
                        >
                            {
                                customers.map((c) => {
                                    return (
                                        <option value={c.id}>
                                            {c.lastname + ", " + c.firstname}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <div class="form-group row py-2">
                    <label class="col-sm-4 col-form-label">
                        Is The Order Fulfilled?:
                    </label>
                    <div class="col-sm-8">
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                id="checkTrue"
                                value={true}
                                onChange={(event) => { setIsOrderFulfilled(event.target.value) }}
                            />
                            <label class="form-check-label" for="checkTrue">
                                True
                            </label>
                        </div>
                        <div class="form-check">
                            <input
                                class="form-check-input"
                                type="radio"
                                id="checkFalse"
                                value={false}
                                onChange={(event) => { setIsOrderFulfilled(event.target.value) }}
                            />
                            <label class="form-check-label" for="checkFalse">
                                False
                            </label>
                        </div>
                    </div>
                </div>

                <div class="pt-4 d-flex gap-3">
                    <button
                        class="form-control btn-warning"
                        onClick={() => { handleSave() }}
                    >
                        Add New Order
                    </button>

                    <button
                        class="form-control btn-danger"
                        onClick={() => { history.back() }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}