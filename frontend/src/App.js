import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";

import Home from "./components/Home";
import CategoryShow from "./components/Category/CategoryShow";
import CategorySave from "./components/Category/CategorySave";
import ProductShow from "./components/Product/ProductShow";
import ProductSave from "./components/Product/ProductSave";
import CustomerShow from "./components/Customer/CustomerShow";
import CustomerSave from "./components/Customer/CustomerSave";
import OrderShow from "./components/Order/OrderShow";
import OrderSave from "./components/Order/OrderSave";

function App() {
  const navigate = useNavigate();

  return (
        <div className="d-flex">
          <div className="cc-side-nav w-25 bg-light vh-100 p-3 position-block">
            {/* Placeholder for sidebar styling */}
          </div>

          <div className="cc-side-nav w-25 bg-light vh-100 p-3 position-fixed">
            <h2 id="logo-title" onClick={() => navigate("/")}>
              Simple Commerce Management System
            </h2>
            <hr />
            <ul className="navbar-nav pl-5">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  Products
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/customers" className="nav-link">
                  Customer Records
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/orders" className="nav-link ">
                  Order Records
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex-grow-1 w-75">
            <div>
              <Routes>
                <Route path="*" element={<Home />} />

                <Route path="/categories/*" element={<CategoryShow />} />
                <Route path="/categories/form" element={<CategorySave />} />
                <Route path="/categories/form/:id" element={<CategorySave />} />

                <Route path="/products/*" element={<ProductShow />} />
                <Route path="/products/form" element={<ProductSave />} />
                <Route path="/products/form/:id" element={<ProductSave />} />

                <Route path="/customers/*" element={<CustomerShow />} />
                <Route path="/customers/form" element={<CustomerSave />} />
                <Route path="/customers/form/:id" element={<CustomerSave />} />

                <Route path="/orders/*" element={<OrderShow />} />
                <Route path="/orders/form" element={<OrderSave />} />
                {/* Uncomment when implementing */}
                {/* <Route path="/orders/form/:id" element={<OrderSave />} /> */}
              </Routes>
            </div>
          </div>
        </div>
  );
}

export default App;
