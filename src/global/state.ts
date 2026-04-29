export type GlobalState = {
  elements: {
    canvasContainer: HTMLDivElement
    canvas: HTMLCanvasElement
    cmdContainer: HTMLDivElement
    cmdHistory: HTMLUListElement
    cmdInput: HTMLInputElement
  }

  canvas: {
    ctx2d: CanvasRenderingContext2D
    resolutionX: number
    resolutionY: number
    name: string
    zoom: number
    sizeX: number
    sizeY: number
    cursorX: number
    cursorY: number
    panX: number
    panY: number
    colorList: string[]
    currentColor: number
    buffer: number[][]
  }
}