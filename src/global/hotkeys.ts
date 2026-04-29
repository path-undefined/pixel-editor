import { GlobalState } from "./state";

export function initializeGlobalHotkeys(s: GlobalState) {
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      ev.preventDefault();

      if (document.activeElement === s.elements.cmdInput) {
        s.elements.canvas.focus();
      } else {
        s.elements.cmdInput.focus();
      }
    }
  });
}