import { useEffect, type RefObject } from "react";

function isProtectedTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("[data-protected-media]"));
}

export function useContentProtection(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const blockContextMenu = (event: MouseEvent) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockDragStart = (event: DragEvent) => {
      if (isProtectedTarget(event.target)) {
        event.preventDefault();
      }
    };

    const blockSaveShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== "s") {
        return;
      }
      event.preventDefault();
    };

    scope.addEventListener("contextmenu", blockContextMenu);
    scope.addEventListener("dragstart", blockDragStart);
    document.addEventListener("keydown", blockSaveShortcut);

    return () => {
      scope.removeEventListener("contextmenu", blockContextMenu);
      scope.removeEventListener("dragstart", blockDragStart);
      document.removeEventListener("keydown", blockSaveShortcut);
    };
  }, [scopeRef]);
}
