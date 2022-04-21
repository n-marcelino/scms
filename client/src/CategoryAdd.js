import React, { useState, useEffect } from "react";
import FormValidation from "./FormValidation";

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
        <div class="form-group w-50 p-3">
            <h1>Add Categories</h1>
            <div class="form-group row py-2">
                <label class="col-2 col-form-label">
                    Name: 
                </label>
                <div class="col-10">
                    <input
                        class="form-control"
                        required
                        value={name}
                        onChange= {(event)=>{setName(event.target.value)}}
                    />
                    <div class="invalid-feedback">
                        This field is required.
                    </div>
                </div>

                
            </div>
            

            <div class="pt-4">
                <button
                    class="form-control btn-warning"
                    onClick={()=>{handleSave()}}
                >
                    Add New Category
                </button>
            </div>
        </div>
    )
}