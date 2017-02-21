import * as d3 from "d3";

export class Layer {

  projection = null;
  path       = null;
  mainLayer  = null;

  load() {
    this.initializeProjection();
    this.initializePath();
    this.resetProjection();
    this.setProjection();
    this.draw();
  }

  clear () {
    // this.ownVectorLayer.select(`.${this.name}`).remove();
  }

  initializeOwnVectorLayer() {
    this.clear();
    this.ownVectorLayer = this.mainLayer.map.append('g').attr('class', `polygon ${this.name}`);
  }

  initializeProjection() {
    this.projection = d3.geoMercator();
    this.projection
      .center([9, 45])
      .scale(1000)
      .translate([this.mainLayer.width / 2, this.mainLayer.height / 2]);
  }

  initializePath() {
    this.path = d3.geoPath().projection(this.projection);
  }

  resetProjection() {
    this.projection.scale(1).translate([0, 0]);
  }

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
