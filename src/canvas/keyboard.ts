import { GlobalState } from "../global/state";
import { render } from "./render";

export function initializeKeyboardControl(s: GlobalState) {
  s.elements.canvas.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowUp") {
      s.canvas.cursorY = Math.max(s.canvas.cursorY - 1, 0);
      render(s);
    } else if (ev.key === "ArrowDown") {
      s.canvas.cursorY = Math.min(s.canvas.cursorY + 1, s.canvas.sizeY - 1);
      render(s);
    } else if (ev.key === "ArrowLeft") {
      s.canvas.cursorX = Math.max(s.canvas.cursorX - 1, 0);
      render(s);
    } else if (ev.key === "ArrowRight") {
      s.canvas.cursorX = Math.min(s.canvas.cursorX + 1, s.canvas.sizeX - 1);
      render(s);
    }
  });
}
