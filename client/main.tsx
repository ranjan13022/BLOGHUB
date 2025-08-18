import "./global.css";
import { createRoot } from "react-dom/client";
import App from "./App";

// Get the root element
const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element not found");
}

// Create root only once and store it
let root: ReturnType<typeof createRoot>;

// Check if we're in development and handle HMR properly
if (import.meta.hot) {
  // In development, check if root already exists
  if (!(container as any)._reactRoot) {
    root = createRoot(container);
    (container as any)._reactRoot = root;
  } else {
    root = (container as any)._reactRoot;
  }
} else {
  // In production, create root normally
  root = createRoot(container);
}

root.render(<App />);
