import React, { useState, useEffect } from "react";

export default function CustomerDelete() {
    const [id, setId] = useState(0);

    const urlCustomers = "http://localhost:8080/api/customers";

    function handleUpdate() {
        
        var payload = {
            id: id,
        }

        fetch(urlCustomers, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(payload)
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(response);
                setId(0);
            })
            .catch((error) => {
            });
    }

    return (
        <div class="form-group w-50">
            <h1>Delete Customer Record</h1>
            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    ID: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control"
                        value={id}
                        onChange= {(event)=>{setId(event.target.value)}}
                    />
                </div>
               
            </div>

            <div class="pt-4">
                <button
                    class="form-control btn-warning"
                    onClick={()=>{handleUpdate()}}
                >
                    Delete Customer
                </button>
            </div>
        </div>
    )
}