import React from "react";
import ReactDOM from "react-dom/client";  // ✅ Correct import for React 18+
import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));  // ✅ Correct method
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
