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
        <div className="form-group w-50 p-3">
            <h1>Add Categories</h1>
            <div className="form-group row py-2">
                <label className="col-2 col-form-label">
                    Name: 
                </label>
                <div className="col-10">
                    <input
                        className="form-control"
                        value={name}
                        onChange= {(event)=>{setName(event.target.value)}}
                    />
                </div>
                
            </div>

            <div className="pt-4">
                <button
                    className="form-control btn-warning"
                    onClick={()=>{handleSave()}}
                >
                    Add New Category
                </button>
            </div>
        </div>
    )
}