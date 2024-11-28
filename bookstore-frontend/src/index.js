// Entry point for the application

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Initialize the React app by rendering the App component inside the root HTML element
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
