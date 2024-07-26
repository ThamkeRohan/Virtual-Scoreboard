import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { SettingsProvider } from "./contexts/SettingsContext.jsx";
import { ErrorPortalProvider } from "./contexts/ErrorPortalContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorPortalProvider>
      <SettingsProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </SettingsProvider>
    </ErrorPortalProvider>
  </React.StrictMode>
);
