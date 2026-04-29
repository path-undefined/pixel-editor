import { GlobalState } from "../global/state";
import { initializeKeyboardControl } from "./keyboard";
import { render } from "./render";

const INIT_SIZE_X = 60;
const INIT_SIZE_Y = 60;
const INIT_NAME = "Untitled Pixel Art";
const INIT_ZOOM = 10;
const INIT_CURSOR_X = 30;
const INIT_CURSOR_Y = 30;

export function initializeCanvas(s: GlobalState) {
  const renderCtx = s.elements.canvas.getContext("2d") as CanvasRenderingContext2D;

  renderCtx.imageSmoothingEnabled = false;

  const dpr = window.devicePixelRatio || 1;

  const canvasRect = s.elements.canvas.getBoundingClientRect();

  const resolutionX = dpr * canvasRect.width;
  const resolutionY = dpr * canvasRect.height;

  s.elements.canvas.width = resolutionX;
  s.elements.canvas.height = resolutionY;

  const buffer: number[][] = [];

  for (let x = 0; x < INIT_SIZE_X; x++) {
    const col: number[] = [];
    for (let y = 0; y < INIT_SIZE_Y; y++) {
      col.push(0);
    }
    buffer.push(col);
  }

  s.canvas = {
    ctx2d: renderCtx,
    resolutionX,
    resolutionY,
    name: INIT_NAME,
    sizeX: INIT_SIZE_X,
    sizeY: INIT_SIZE_Y,
    zoom: INIT_ZOOM,
    cursorX: INIT_CURSOR_X,
    cursorY: INIT_CURSOR_Y,
    panX: 0,
    panY: 0,
    buffer,
  };

  initializeKeyboardControl(s);
  render(s);
}
