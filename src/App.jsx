import React from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import {
  useErrorPortal,
  useErrorPortalUpdate,
} from "./contexts/ErrorPortalContext";
import ErrorModal from "./components/Error/ErrorModal";
import AppRoutes from "./components/AppRoutes";
import ProfileBadge from "./components/ProfileBadge";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { error } = useErrorPortal();
  const {isAuthenticated} = useAuth()
  const { closeError } = useErrorPortalUpdate();
  return (
    <>
      <header>
        {isAuthenticated && <ProfileBadge/>}
        <Navigation />
      </header>

      <AppRoutes />

      <ErrorModal error={error} closeErrorModal={closeError} />
    </>
  );
}

export default App;
