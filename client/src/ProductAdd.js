import React, { useState, useEffect } from "react";

export default function ProductAdd() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0.00);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");

    const urlCategories = "http://localhost:8080/api/categories";
    const urlProducts = "http://localhost:8080/api/products";

    useEffect(() => {
        loadCategories();
    }, []); //function called only once

    function loadCategories() {
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                if (data.categories.length > 0) {
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
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
            .then(response => response.json())
            .then(() => {
                console.log(response);
                setName("");
                setPrice(0.00);
            })
            .catch((error) => {
            });
    }

    return (
        <div classsName="p-3">
            <div classsName="form-group w-50">
                <h1>Add Products</h1>
                <div classsName="form-group row py-2">
                    <label classsName="col-2 col-form-label">
                        Name:
                    </label>
                    <div classsName="col-10">
                        <input
                            classsName="form-control"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>

                </div>

                <div classsName="form-group row py-2">
                    <label classsName="col-sm-2 col-form-label">
                        Price:
                    </label>
                    <div classsName="col-sm-10">
                        <input
                            classsName="form-control"
                            value={price}
                            onChange={(event) => { setPrice(event.target.value) }}
                        />
                    </div>

                </div>

                <div classsName="form-group row py-2">
                    <label classsName="col-sm-2 col-form-label">
                        Category:
                    </label>
                    <div classsName="col-sm-10">
                        <select
                            classsName="form-control"
                            value={categoryId}
                            onChange={(event) => { setCategoryId(event.target.value) }}
                        >
                            <option selected="selected" disabled>
                                --Categories--
                            </option>
                            {
                                categories.map((c) => {
                                    return (
                                        <option value={c.id}>
                                            {c.name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                </div>

                <div classsName="pt-4">
                    <button
                        classsName="form-control btn-warning"
                        onClick={() => { handleSave() }}
                    >
                        Add New Product
                    </button>
                </div>
            </div>
        </div>
    )
}