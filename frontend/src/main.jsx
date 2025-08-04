import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// SyncFusion License
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE);
// SyncFusion License

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
