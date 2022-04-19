import React from "react";
import ReactDOM from "react-dom";

import MainApp from "./MainApp"; //given this component, render it inside div#root

import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate
} from "react-router-dom";

//short function syntax
//function   does  smth
//function()  =>  (smth)
//()=>()\

//waits for event "DOMContentLoaded", which is your html loading fully; if loaded, do function ()=>()
document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <BrowserRouter>
            <MainApp/>
        </BrowserRouter>, 
        //you can also use self-closing </MainApp>, it will also work (shortcut)
        document.getElementById('root')
    ) //render accepts two arguments: component it will load (mainapp) & the element it will load into (div#root)
});