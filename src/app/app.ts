import { initializeCanvas } from "../canvas/initialize";
import { GlobalState } from "../global/state";
import { initializeGlobalHotkeys } from "../global/hotkeys";

export function initialize() {
  const canvasContainer = document.querySelector("#canvas-container") as HTMLDivElement;
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const cmdContainer = document.querySelector("#cmd-container") as HTMLDivElement;
  const cmdHistory = document.querySelector("#cmd-history") as HTMLUListElement;
  const cmdInput = document.querySelector("#cmd-input") as HTMLInputElement;

  const state = {
    elements: {
      canvasContainer,
      canvas,
      cmdContainer,
      cmdHistory,
      cmdInput,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    canvas: null as any,
  } satisfies GlobalState;

  initializeGlobalHotkeys(state);
  initializeCanvas(state);
}
