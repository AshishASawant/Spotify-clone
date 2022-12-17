import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Musicstate from "./state/Musicstate";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Musicstate>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Musicstate>
);
