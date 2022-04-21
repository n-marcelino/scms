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
        <div class="form-group w-50 p-3">
            <h1>Add Customer Record</h1>
            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    First Name: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={firstName}
                        onChange= {(event)=>{setFirstName(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>

                </div>
               
            </div>

            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    Last Name: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={lastName}
                        onChange= {(event)=>{setLastName(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>

                </div>
                
            </div>
           
            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    Street: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={street}
                        onChange= {(event)=>{setStreet(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>

                </div>
            </div>

            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    City: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={city}
                        onChange= {(event)=>{setCity(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>
                </div>                
            </div>

            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    ZIP: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={zip}
                        onChange= {(event)=>{setZip(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>

                </div>                
            </div>

            <div class="form-group row py-2">
                <label class="col-3 col-form-label">
                    Phone Number: 
                </label>
                <div class="col-9">
                    <input
                        class="form-control is-invalid"  aria-describedby="validationServer03Feedback" required
                        value={phone}
                        onChange= {(event)=>{setPhone(event.target.value)}}
                    />

                    <div id="validationServer03Feedback" class="invalid-feedback">
                        This field is required.
                    </div>

                </div>
            </div>

            <div class="pt-4">
                <button
                    class="form-control btn-warning"
                    onClick={()=>{handleSave()}}
                >
                    Add New Customer
                </button>
            </div>
        </div>
    )
}