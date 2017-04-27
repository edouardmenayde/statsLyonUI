import {geoMercator, geoPath} from "d3-geo";
import {select} from "d3-selection";

export class Layer {

  layerManager;

  canvas;

  vectorLayer;

  /**
   * Create the layer with elements given by the layer manager.
   *
   * @param {object} layerManager
   * @param {object} canvas
   * @param {object} endpoint
   */
  constructor(layerManager, canvas,
              endpoint) {
    this.layerManager = layerManager;
    this.canvas       = canvas;
    this.endpoint     = endpoint;
  }

  /**
   * Reload the layer
   */
  reload() {
    this.doInitialize();
    this.load();
  }

  /**
   * Load the layer
   */
  load() {
    this.initializeProjection();
    this.initializePath();
    this.resetProjection();
    this.setProjection();
    this.draw();
  }

  /**
   * Execute all the initialization steps
   */
  doInitialize() {
    this.initializeLayer()
      .initialize();
  }

  /**
   * Initialize the projection.
   */
  initializeProjection() {
    this.projection = geoMercator();
    this.projection
      .center([9, 45])
      .scale(1000)
      .translate([this.canvas.width / 2, this.canvas.height / 2]);
  }

  /**
   * Initialize the path.
   */
  initializePath() {
    this.path = geoPath().projection(this.projection);
  }

  /**
   * Reset the projection.
   */
  resetProjection() {
    this.projection.scale(1).translate([0, 0]);
  }

  /**
   * Set the projection.
   */
  setProjection() {
    const [[left, top], [right, bottom]] = this.path.bounds(this.featureCollection);

    const larger       = Math.max(
      (right - left) / this.canvas.width,
      (bottom - top) / this.canvas.height
    );
    const SCALING      = 0.95;
    const scale        = SCALING / larger;
    const centerWidth  = (this.canvas.width - (scale * (right + left))) / 2;
    const centerHeight = (this.canvas.height - (scale * (top + bottom))) / 2;
    const translate    = [centerWidth, centerHeight];

    this.projection.scale(scale).translate(translate);
  }

  getName() {
    return this.constructor.name;
  }

  clear() {
    if (!this.vectorLayer) {
      return;
    }

    select(`#${this.getName()}`).remove();

    this.vectorLayer = null;
  }

  initializeLayer() {
    this.vectorLayer = this.canvas.instance.append('g')
      .attr('class', 'polygon')
      .attr('id', this.getName());

    return this;
  }
}
