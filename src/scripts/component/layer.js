import * as d3 from "d3";

export class Layer {

  projection = null;
  path       = null;
  mainLayer  = null;

  /**
   * Load the layer.
   */
  load() {
    this.initializeProjection();
    this.initializePath();
    this.resetProjection();
    this.setProjection();
    this.draw();
  }

  /**
   * Clearing the vector layer using the name of the class (or inheriting class) if it exists.
   */
  clear () {
    if (!this.ownVectorLayer) {
      return;
    }

    this.mainLayer.map.select(`.${this.constructor.name}`).remove();
  }

  /**
   * Initialize a vector layer with using the name of the class (or inheriting class) as a class.
   */
  initializeOwnVectorLayer() {
    this.clear();
    this.ownVectorLayer = this.mainLayer.map.append('g').attr('class', `polygon ${this.constructor.name}`);
  }

  /**
   * Initialize the projection.
   */
  initializeProjection() {
    this.projection = d3.geoMercator();
    this.projection
      .center([9, 45])
      .scale(1000)
      .translate([this.mainLayer.width / 2, this.mainLayer.height / 2]);
  }

  /**
   * Initialize the path.
   */
  initializePath() {
    this.path = d3.geoPath().projection(this.projection);
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
      (right - left) / this.mainLayer.width,
      (bottom - top) / this.mainLayer.height
    );
    const SCALING      = .95;
    const scale        = SCALING / larger;
    const centerWidth  = (this.mainLayer.width - scale * (right + left)) / 2;
    const centerHeight = (this.mainLayer.height - scale * (top + bottom)) / 2;
    const translate    = [centerWidth, centerHeight];

    this.projection.scale(scale).translate(translate);
  }

}
