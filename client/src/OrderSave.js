import React, { useState, useEffect } from "react";

export default function OrderSave() {

    // const [orders, setOrder] = useState({
    //     // fields
    //     // referenceNumber:"",
    //     // isFulfilled: false,
    //     // orderItems: [{
    //     // }]
    // });

    const [orderItems, setOrderItems] = useState([]);
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
        console.log("orderItems: " + orderItems);
        console.log("isOrderFulfilled" + isOrderFulfilled);

        var payload = {
            customerId: customerId,
            orderItems: orderItems,
            isOrderFulfilled: isOrderFulfilled
        }

        console.log(payload);

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
            })
            .catch((error) => {
            });
    }

    function handlePriceChanged(index, value) {
        orderItems[index].price = value;
        setOrderItems([...orderItems]);
    }

    function handleProductChanged(index, value) {
        orderItems[index].productId = value;
        setOrderItems([...orderItems]);
    }

    function handleQuantityChange(index, value) {
        orderItems[index].quantity = value;
        setOrderItems([...orderItems]);
    }

    function removeItem(index) {
        orderItems.splice(index, 1);

        for (var i = 0; i < orderItems.length; i++) {
            orderItems[i].index = i;
        }

        setOrderItems([...orderItems]);
    }

    function renderOrderItems() {
        if (orderItems.length == 0) {
            return (
                <div>
                    No items
                </div>
            )
        } else {
            return (
                orderItems.map((o) => {
                    return (
                        <div>
                            Item {o.index}

                            <input
                                value={o.price}
                                onChange={
                                    (event) => { handlePriceChanged(o.index, event.target.value) }
                                }
                            >
                            </input>

                            <input
                                value={o.quantity}
                                onChange={
                                    (event) => { handleQuantityChange(o.index, event.target.value) }
                                }
                            >
                            </input>

                            <select
                                class="form-control"
                                value={o.productId}
                                onChange={(event) => {
                                    handleProductChanged(o.index, event.target.value)
                                }}
                            >
                                {
                                    products.map((p) => {
                                        return (
                                            <option value={p.id}>
                                                {p.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>

                            <button onClick={() => {
                                removeItem(o.index)
                            }}>
                                Delete
                            </button>
                        </div>
                    )
                })
            )
        }
    }

    function addOrderItem() {

        var index = orderItems.length - 1;

        if (orderItems.length == 0) {
            index = 0;
        } else {
            index = orderItems.length;
        }

        var orderItem = {
            productId: products[0].id,
            price: 0.00,
            quantity: 0,
            index: index
        };

        orderItems.push(orderItem);
        setOrderItems([...orderItems]);
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

                <div>
                    {renderOrderItems()}

                    <button
                        class="form-control btn-warning"
                        onClick={() => { addOrderItem() }}
                    >
                        Add Order Item
                    </button>
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