import React, { useState, useEffect } from "react";

export default function CustomerAdd() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");

    const urlCustomers = "http://localhost:8080/api/customers";

    function handleSave() {
        console.log("firstName: " + firstName);
        console.log("lastName: " + lastName);
        console.log("street: " + street);
        console.log("city: " + city);
        console.log("zip: " + zip);
        console.log("phone: " + phone);

        var payload = {
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            zip: zip,
            phone: phone
        }

        fetch(urlCustomers, 
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
                setFirstName("");
                setLastName("");
                setStreet("");
                setCity("");
                setZip("");
                setPhone("");
            })
            .catch((error) => {
            });
    }

    return (
        <div>
            <h1>Add Customer Record</h1>
            <div>
                <label>
                    First Name: 
                </label>
                <input
                    value={firstName}
                    onChange= {(event)=>{setFirstName(event.target.value)}}
                />
            </div>

            <div>
                <label>
                    Last Name: 
                </label>
                <input
                    value={lastName}
                    onChange= {(event)=>{setLastName(event.target.value)}}
                />
            </div>
           
            <div>
                <label>
                    Street: 
                </label>
                <input
                    value={street}
                    onChange= {(event)=>{setStreet(event.target.value)}}
                />
            </div>

            <div>
                <label>
                    City: 
                </label>
                <input
                    value={city}
                    onChange= {(event)=>{setCity(event.target.value)}}
                />
            </div>

            <div>
                <label>
                    ZIP: 
                </label>
                <input
                    value={zip}
                    onChange= {(event)=>{setZip(event.target.value)}}
                />
            </div>

            <div>
                <label>
                    Phone Number: 
                </label>
                <input
                    value={phone}
                    onChange= {(event)=>{setPhone(event.target.value)}}
                />
            </div>

            <div>
                <button
                    onClick={()=>{handleSave()}}
                >
                    Add New Customer
                </button>
            </div>
        </div>
    )
}