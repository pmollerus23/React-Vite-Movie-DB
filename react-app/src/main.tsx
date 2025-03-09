import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import "./css/index.css";
import { AuthProvider, useAuth } from "./contexts/UserContext"; // Assuming UserContext is exported from here


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
