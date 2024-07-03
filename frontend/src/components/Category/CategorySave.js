import React, { useState, useEffect } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

export default function CategorySave() {

    const navigate = useNavigate();
    const [name, setName] = useState("");

    const urlCategories = "http://localhost:8080/api/categories";

    useEffect(()=>{
        loadCategories();
    },[]);

    var { id } = useParams();

    function loadCategories() {
        if(id) {
            fetch(`${urlCategories}/${id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setName(data.name);
                })
                .catch((error) => {
                });
        }
    }

    function renderHeader() {
        if(id) {
            return(
                <h1>
                    Editing Category {id}
                </h1>
            )
        } else {
            return(
                <h1>
                    Add Category
                </h1>
            )
        }
    }

    function handleSave() {
        console.log("Id: " + id);
        console.log("Name: " + name);

        var payload = {
            id:id,
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

    function alertSuccess() {
        alert("Operation Successful!");

        navigate('/categories/');
    }

    return (
        <div class="form-group w-50 p-3">
            {renderHeader()}

            <div class="form-group row py-2">
                <label class="col-2 col-form-label">
                    Name:
                </label>
                <div class="col-10">
                    <input
                        class="form-control"
                        value={name}
                        onChange= {(event)=>{setName(event.target.value)}}
                    />
                </div>

            </div>

            <div class="pt-4 d-flex gap-3">
                <button
                    class="form-control btn-warning"
                    onClick={()=>{handleSave(); alertSuccess() }}
                >
                    Save Category
                </button>

                <button
                    class="form-control btn-danger"
                    onClick={()=>{navigate('/categories/')}}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}