const RELOAD_KEY = "bianca:chunk-reload";

function isChunkLoadFailure(reason: unknown): boolean {
  const message =
    reason instanceof Error
      ? `${reason.name} ${reason.message}`
      : String(reason ?? "");

  return /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk [\w-]+ failed|error loading dynamically imported module|ChunkLoadError/i.test(
    message,
  );
}

/**
 * After a deploy, open tabs may request stale hashed chunks (404). Recover with
 * a single reload instead of leaving a blank or stuck Suspense state.
 */
export function installStaleChunkRecovery(): () => void {
  const onRejection = (event: PromiseRejectionEvent) => {
    if (!isChunkLoadFailure(event.reason)) return;

    try {
      if (sessionStorage.getItem(RELOAD_KEY) === "1") return;
      sessionStorage.setItem(RELOAD_KEY, "1");
    } catch {
      // sessionStorage may be blocked — still attempt one navigation reload.
    }

    event.preventDefault();
    window.location.reload();
  };

  const onPageShow = () => {
    try {
      sessionStorage.removeItem(RELOAD_KEY);
    } catch {
      /* ignore */
    }
  };

  window.addEventListener("unhandledrejection", onRejection);
  window.addEventListener("pageshow", onPageShow);

  return () => {
    window.removeEventListener("unhandledrejection", onRejection);
    window.removeEventListener("pageshow", onPageShow);
  };
}
