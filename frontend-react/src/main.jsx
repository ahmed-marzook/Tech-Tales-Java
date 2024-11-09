import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Home />
  </StrictMode>
);
