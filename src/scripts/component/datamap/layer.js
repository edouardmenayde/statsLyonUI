export class Layer {

  layerManager;

  canvas;

  vectorLayer;

  constructor(layerManager, canvas) {
    this.layerManager = layerManager;
    this.canvas       = canvas;

    this.initializeLayer();
  }

  getName() {
    return this.constructor.name;
  }

  clear() {
    if (!this.vectorLayer) {
      return;
    }

    this.canvas
      .instance
      .select(`.${this.getName()}`)
      .remove();
  }

  initializeLayer() {
    this.vectorLayer = this.canvas.instance.append('g').attr(`polygon ${this.getName()}`);
  }
}
