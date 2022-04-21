import React, { useState, useEffect } from "react";

export default function OrderAdd() {
    const [customer, setCustomer] = useState("");
    const [products, setProducts] = useState([]);

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadCategories();
    }, []); //function called only once

    function loadCategories() {
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                if(data.categories.length > 0) {
                    setCategoryId(data.categories[0].id)
                }
                setCategories(data.categories);
            })
            .catch((error) => {
            });
    }

    function handleSave() {
        console.log("Name: " + name);
        console.log("Price: " + price);
        console.log("CategoryId: " + categoryId);

        var payload = {
            name: name,
            price: price,
            categoryId: categoryId
        }

        fetch(urlProducts, 
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
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
            <h1>Add Products</h1>
            <div>
                <label>
                    Name: 
                </label>
                <input
                    value={name}
                    onChange= {(event)=>{setName(event.target.value)}}
                />
            </div>
            <div>
                <label>
                    Price: 
                </label>
                <input
                    value={price}
                    onChange= {(event)=>{setPrice(event.target.value)}}
                />
            </div>

            <div>
                <label>
                    Category: 
                </label>
                <select 
                    value={categoryId}
                    onChange = {(event)=> {setCategoryId(event.target.value)}}
                >
                    {
                        categories.map((c) => {
                            return (
                                <option value = {c.id}>
                                    {c.name}
                                </option>
                            )
                        })
                    }
                </select>
            </div>

            <div>
                <button
                    onClick={()=>{handleSave()}}
                >
                    Add New Product
                </button>
            </div>
        </div>
    )
}