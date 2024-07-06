import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerSave = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");

    const urlCustomers = "http://localhost:8080/api/customers";

    useEffect(() => {
        if (id) {
            loadCustomer(); 
        }
    }, [id]);

    const loadCustomer = () => {
        fetch(`${urlCustomers}/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch customer');
                }
                return response.json();
            })
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setStreet(data.street);
                setCity(data.city);
                setZip(data.zip);
                setPhone(data.phone);
            })
            .catch(error => {
                console.error('Error fetching customer:', error);
            });
    };

    const handleSave = () => {
        const payload = {
            firstName: firstName,
            lastName: lastName,
            street: street,
            city: city,
            zip: zip,
            phone: phone
        };

        const method = id ? 'PUT' : 'POST';
        const saveUrl = id ? `${urlCustomers}/${id}` : urlCustomers;

        fetch(saveUrl, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Customer saved:", data);
                alertSuccess();
                setFirstName("");
                setLastName("");
                setStreet("");
                setCity("");
                setZip("");
                setPhone("");
            })
            .catch(error => {
                console.error('Error saving customer:', error);
            });
    };

    const alertSuccess = () => {
        alert("Operation Successful!");
        navigate('/customers');
    };

    const renderHeader = () => {
        if (id) {
            return <h1>Editing Customer {id}</h1>;
        } else {
            return <h1>Add Customer</h1>;
        }
    };

    return (
        <div className="form-group w-50 p-3">
            {renderHeader()}

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">First Name:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={firstName}
                        onChange={event => setFirstName(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">Last Name:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={lastName}
                        onChange={event => setLastName(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">Street:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={street}
                        onChange={event => setStreet(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">City:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={city}
                        onChange={event => setCity(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">ZIP:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={zip}
                        onChange={event => setZip(event.target.value)}
                    />
                </div>
            </div>

            <div className="form-group row py-2">
                <label className="col-3 col-form-label">Phone Number:</label>
                <div className="col-9">
                    <input
                        className="form-control"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                </div>
            </div>

            <div className="pt-4 d-flex gap-3">
                <button
                    className="form-control btn btn-warning"
                    onClick={() => handleSave()}
                >
                    Save Customer
                </button>

                <button
                    className="form-control btn btn-danger"
                    onClick={() => navigate('/customers')}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default CustomerSave;
