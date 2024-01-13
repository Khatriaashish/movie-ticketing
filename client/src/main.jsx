import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import Routing from "./router/routing.config";
import "@fortawesome/fontawesome-free/css/all.min.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<React.StrictMode>
    <Routing/>
</React.StrictMode>)