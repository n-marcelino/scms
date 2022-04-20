import React, { useState, useEffect } from "react";

export default function CategoryShow() {

    //observable variable and function that updates variable
    const [message, setMessage] = useState(""); //string
    const [categories, setCategories] = useState([]); //empty array
    const urlCategories = "http://localhost:8080/api/categories";

    useEffect(() => {
        loadCategories()
    }, []); //function called only once

    function loadCategories() {
        // Step 1: Call the urlProducts URL
        fetch(urlCategories)
            .then(response => response.json())
            .then(data => {
                // Step 2: Given the json response, load it to products variable
                setCategories(data.categories);
            })
            .catch((error) => {
            });
    }

    function renderCategories() {
        

        if(categories.length > 0) {
            return(
                <div class="d-flex gap-3">
                    {
                        categories.map((c) => {
                            return(
                                <div class="bg-light p-5">
                                    <h2>{c.name}</h2>
                                    <h5>ID: {c.id}</h5>
                                    <div class="d-flex gap-1 pt-4">
                                        <button type="button" class="w-100 btn btn-warning">
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <h2>
                    No Categories Foud
                </h2>
            )
        }
    }

    return ( //returns a single element only; so you can nest all other elements inside one div
        <div>
            <h1>
                Category List
            </h1>

            {/* <input
                value={message}
                onChange={(event)=>{setMessage(event.target.value)}}
            /> */}

            <div>
                {/* a variable called message, which will be rendered*/}
                {message}
            </div>

            {renderCategories()}


        </div>
    )

}