import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import AppErrorBoundary from "./app/components/AppErrorBoundary.tsx";
import { installStaleChunkRecovery } from "./app/lib/recoverStaleChunks.ts";
import "./styles/index.css";

installStaleChunkRecovery();

const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML =
    '<main style="min-height:100svh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#faf8f5;color:#1d3c34;font-family:Georgia,serif;padding:2rem;text-align:center"><p style="letter-spacing:.22em;text-transform:uppercase;font-size:11px">Bianca Diamonds</p><p style="margin-top:1rem">Please reload the page.</p><p style="margin-top:1.5rem"><a href="/" style="color:#1d3c34">Home</a></p></main>';
} else {
  createRoot(rootElement).render(
    <AppErrorBoundary>
      <App />
    </AppErrorBoundary>,
  );
}
