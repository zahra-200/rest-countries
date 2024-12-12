import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { CountriesContextProvider } from "./context/CounrtiesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <CountriesContextProvider>
        <App />
      </CountriesContextProvider>
    </BrowserRouter>
  </StrictMode>
);
