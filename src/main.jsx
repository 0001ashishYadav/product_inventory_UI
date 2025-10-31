import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { GlobalContextProvider } from "./context/globalContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GlobalContextProvider>
  </StrictMode>
);
