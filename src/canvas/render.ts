import { GlobalState } from "../global/state";

export function render(s: GlobalState) {
  renderBackground(s);
  for (let x = 0; x < s.canvas.sizeX; x++) {
    for (let y = 0; y < s.canvas.sizeY; y++) {
      renderPixel(s, x, y);
    }
  }
  renderGrid(s);
  renderFrame(s);
  renderCursor(s);
}

function renderBackground(s: GlobalState) {
  s.canvas.ctx2d.fillStyle = "#888888";
  s.canvas.ctx2d.fillRect(0, 0, s.canvas.resolutionX, s.canvas.resolutionY);
}

function renderGrid(s: GlobalState) {
  const [left, top] = bufferToCanvas(s, [0, 0]);
  const width = s.canvas.sizeX * s.canvas.zoom;
  const height = s.canvas.sizeY * s.canvas.zoom;

  s.canvas.ctx2d.strokeStyle = "#cccccc";
  s.canvas.ctx2d.lineWidth = 1;

  for (let x = 1; x < s.canvas.sizeX; x++) {
    s.canvas.ctx2d.beginPath();
    s.canvas.ctx2d.moveTo(left + x * s.canvas.zoom + 0.5, top + 0.5);
    s.canvas.ctx2d.lineTo(left + x * s.canvas.zoom + 0.5, top + height + 0.5);
    s.canvas.ctx2d.stroke();
  }

  for (let y = 1; y < s.canvas.sizeY; y++) {
    s.canvas.ctx2d.beginPath();
    s.canvas.ctx2d.moveTo(left + 0.5, top + y * s.canvas.zoom + 0.5);
    s.canvas.ctx2d.lineTo(left + width + 0.5, top + y * s.canvas.zoom + 0.5);
    s.canvas.ctx2d.stroke();
  }
}

function renderFrame(s: GlobalState) {
  const [left, top] = bufferToCanvas(s, [0, 0]);
  const [right, bottom] = bufferToCanvas(s, [s.canvas.sizeX, s.canvas.sizeY]);

  s.canvas.ctx2d.fillStyle = "#444444";
  s.canvas.ctx2d.fillRect(right, top + 4, 4, s.canvas.sizeY * s.canvas.zoom);
  s.canvas.ctx2d.fillRect(left + 4, bottom, s.canvas.sizeX * s.canvas.zoom, 4);

  s.canvas.ctx2d.strokeStyle = "#000000";
  s.canvas.ctx2d.lineWidth = 1;
  s.canvas.ctx2d.strokeRect(left + 0.5, top + 0.5, s.canvas.sizeX * s.canvas.zoom, s.canvas.sizeY * s.canvas.zoom);

}

function renderPixel(s: GlobalState, x: number, y: number) {
  const [left, top] = bufferToCanvas(s, [x, y]);

  s.canvas.ctx2d.fillStyle = "#ffffff";
  s.canvas.ctx2d.fillRect(left, top, s.canvas.zoom, s.canvas.zoom);
}

function renderCursor(s: GlobalState) {
  const [x, y] = bufferToCanvas(s, [s.canvas.cursorX, s.canvas.cursorY]);

  s.canvas.ctx2d.strokeStyle = "#ff0000";
  s.canvas.ctx2d.lineWidth = 3;
  s.canvas.ctx2d.strokeRect(x + 0.5, y + 0.5, s.canvas.zoom, s.canvas.zoom);
}

function bufferToCanvas(s: GlobalState, coord: [number, number]): [number, number] {
  const [x, y] = coord;
  
  const bufferCenterX = s.canvas.sizeX / 2;
  const bufferCenterY = s.canvas.sizeY / 2;
  const bufferOffsetX = x - bufferCenterX + s.canvas.panX;
  const bufferOffsetY = y - bufferCenterY + s.canvas.panY;
  const canvasOffsetX = bufferOffsetX * s.canvas.zoom;
  const canvasOffsetY = bufferOffsetY * s.canvas.zoom;
  const canvasCenterX = s.canvas.resolutionX / 2;
  const canvasCenterY = s.canvas.resolutionY / 2;
  const canvasX = Math.round(canvasCenterX + canvasOffsetX);
  const canvasY = Math.round(canvasCenterY + canvasOffsetY);

  return [canvasX, canvasY];
}
