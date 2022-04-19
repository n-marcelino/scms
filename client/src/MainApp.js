import React, { useState, useEffect } from "react";
import {
    HashRouter as Router,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

import Home from "./Home";

export default function MainApp() {
    
    return (
        <div>
            <h1>Simple Commerce Management System</h1>

            <Routes>
                <Route exact path ="/" element={<Home/>}/>
            </Routes>
        </div>
    )

}