import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import StudentPage from "./pages/studentPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudentPage />
  </StrictMode>
);
