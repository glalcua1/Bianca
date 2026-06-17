import { useEffect, useRef } from "react";
import { DESKTOP_MEDIA_QUERY } from "./useMediaMinWidth";

const MEDIA_SELECTOR =
  "img, video, picture, canvas, [data-protected-media], [data-protected-media] *";

function isMediaTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(MEDIA_SELECTOR));
}

function isMacScreenshotShortcut(event: KeyboardEvent) {
  if (!event.metaKey || !event.shiftKey) return false;
  const key = event.key;
  return key === "3" || key === "4" || key === "5" || key === "Digit3" || key === "Digit4" || key === "Digit5";
}

type Options = {
  onCaptureAttempt?: () => void;
};

export function useContentProtection({ onCaptureAttempt }: Options = {}) {
  const onCaptureAttemptRef = useRef(onCaptureAttempt);
  onCaptureAttemptRef.current = onCaptureAttempt;

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MEDIA_QUERY);
    let teardown: (() => void) | undefined;

    const activate = () => {
      const triggerShield = () => {
        onCaptureAttemptRef.current?.();
      };

      const blockContextMenu = (event: MouseEvent) => {
        if (isMediaTarget(event.target)) {
          event.preventDefault();
        }
      };

      const blockDragStart = (event: DragEvent) => {
        if (isMediaTarget(event.target)) {
          event.preventDefault();
        }
      };

      const blockSelectStart = (event: Event) => {
        if (isMediaTarget(event.target)) {
          event.preventDefault();
        }
      };

      const blockCopy = (event: ClipboardEvent) => {
        const selection = document.getSelection();
        if (!selection || selection.isCollapsed) return;

        const anchor = selection.anchorNode;
        const focus = selection.focusNode;
        const touchesMedia =
          (anchor instanceof Element && anchor.closest(MEDIA_SELECTOR)) ||
          (focus instanceof Element && focus.closest(MEDIA_SELECTOR)) ||
          (anchor?.parentElement && anchor.parentElement.closest(MEDIA_SELECTOR)) ||
          (focus?.parentElement && focus.parentElement.closest(MEDIA_SELECTOR));

        if (touchesMedia) {
          event.preventDefault();
        }
      };

      const blockKeyboardShortcuts = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const mod = event.metaKey || event.ctrlKey;

        if (mod && (key === "s" || key === "p" || key === "u")) {
          event.preventDefault();
          triggerShield();
          return;
        }

        if (key === "printscreen") {
          event.preventDefault();
          triggerShield();
          return;
        }

        if (isMacScreenshotShortcut(event)) {
          event.preventDefault();
          triggerShield();
        }
      };

      const blockGesture = (event: Event) => {
        if (isMediaTarget(event.target)) {
          event.preventDefault();
        }
      };

      const blockBeforePrint = (event: Event) => {
        event.preventDefault();
        triggerShield();
      };

      document.addEventListener("contextmenu", blockContextMenu);
      document.addEventListener("dragstart", blockDragStart);
      document.addEventListener("selectstart", blockSelectStart);
      document.addEventListener("copy", blockCopy);
      document.addEventListener("cut", blockCopy);
      document.addEventListener("keydown", blockKeyboardShortcuts);
      document.addEventListener("keyup", blockKeyboardShortcuts);
      document.addEventListener("gesturestart", blockGesture);
      document.addEventListener("gesturechange", blockGesture);
      window.addEventListener("beforeprint", blockBeforePrint);

      document.documentElement.classList.add("content-protection-active");

      return () => {
        document.removeEventListener("contextmenu", blockContextMenu);
        document.removeEventListener("dragstart", blockDragStart);
        document.removeEventListener("selectstart", blockSelectStart);
        document.removeEventListener("copy", blockCopy);
        document.removeEventListener("cut", blockCopy);
        document.removeEventListener("keydown", blockKeyboardShortcuts);
        document.removeEventListener("keyup", blockKeyboardShortcuts);
        document.removeEventListener("gesturestart", blockGesture);
        document.removeEventListener("gesturechange", blockGesture);
        window.removeEventListener("beforeprint", blockBeforePrint);
        document.documentElement.classList.remove("content-protection-active");
      };
    };

    const sync = () => {
      teardown?.();
      teardown = undefined;
      document.documentElement.classList.remove("content-protection-active");

      if (mq.matches) {
        teardown = activate();
      }
    };

    sync();
    mq.addEventListener("change", sync);

    return () => {
      mq.removeEventListener("change", sync);
      teardown?.();
      document.documentElement.classList.remove("content-protection-active");
    };
  }, []);
}
