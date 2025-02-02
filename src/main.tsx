import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import StoreContextProvider from "./context/StoreContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </StrictMode>
);
