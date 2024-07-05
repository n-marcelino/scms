import React from "react";
import {
    Routes,
    Route,
    useNavigate
} from "react-router-dom";
import '../App.css';
import ProductShow from "./Product/ProductShow";
import CategoryShow from "./Category/CategoryShow";
import CustomerShow from "./Customer/CustomerShow";
import OrderShow from "./Order/OrderShow";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="home">
            <div className="head-container">
                <div className="head">
                    <h2>Simple Commerce</h2>
                    <h3>Management System</h3>
                    <p>
                        A simple seller-focused platform that is made primarily with Java,
                        Spring Framework, Rest API, and HTML/CSS/Javascript.
                    </p>
                </div>
            </div>

            <div className="d-flex flex-column px-5 pb-5 gap-5">
                <div className="text d-flex justify-content-evenly">
                    <div className="content" onClick={() => navigate('/categories')}>
                        <h1>
                            <b>Categories</b>
                        </h1>
                        <p>
                            The <b>Categories</b> section enables you to manage different groups of products such as
                            clothing, electronics, or toys. You can add, edit, and delete existing categories.
                        </p>

                        <div className="mt-auto">
                            <button className="btn btn-warning" onClick={() => navigate('/categories')}>
                                Go to Categories!
                            </button>
                        </div>
                    </div>

                    <div className="content" onClick={() => navigate('/products')}>
                        <h1>
                            <b>Products</b>
                        </h1>
                        <p>
                            Keep track of your inventory by visiting the <b>Products</b> section. This will show the
                            list of existing products in your inventory containing their ID, price, and category.
                        </p>

                        <div className="mt-auto">
                            <button className="btn btn-warning" onClick={() => navigate('/products')}>
                                Go to Products!
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text d-flex justify-content-evenly">
                    <div className="content" onClick={() => navigate('/customers')}>
                        <h1>
                            <b>Customers</b>
                        </h1>
                        <p>
                            Manage customer information in an organized way with the <b>Customers</b> section. Easily
                            find, update, and delete customer information.
                        </p>

                        <div className="mt-auto">
                            <button className="btn btn-warning" onClick={() => navigate('/customers')}>
                                Go to Customers!
                            </button>
                        </div>
                    </div>

                    <div className="content" onClick={() => navigate('/orders')}>
                        <h1>
                            <b>Orders</b>
                        </h1>
                        <p>
                            The <b>Orders</b> section helps manage bulk orders efficiently. View order information and verify order status (fulfilled or pending).
                        </p>

                        <div className="mt-auto">
                            <button className="btn btn-warning" onClick={() => navigate('/orders')}>
                                Go to Orders!
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Routes>
                <Route exact path="/categories/*" element={<CategoryShow />} />
                <Route exact path="/products/*" element={<ProductShow />} />
                <Route exact path="/customers/*" element={<CustomerShow />} />
                <Route exact path="/orders/*" element={<OrderShow />} />
            </Routes>

        </div>
    );
}
