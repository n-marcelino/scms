import React, { useState, useEffect } from "react";

export default function CategoryAdd() {
    const [name, setName] = useState("");

    const urlCategories = "http://localhost:8080/api/categories";

    function handleSave() {
        console.log("Name: " + name);

        var payload = {
            name: name
        }

        fetch(urlCategories, 
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
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <h1>Add Categories</h1>
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
                <button
                    onClick={()=>{handleSave()}}
                >
                    Add New Category
                </button>
            </div>
        </div>
    )
}