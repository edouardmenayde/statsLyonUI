import * as d3 from "d3";
import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {Layer} from "./layer";
import {StationsLayer} from "./stations-layer";
import {layer} from "../decorators/layer";

@layer(StationsLayer)
export class PoliticalMapLayer extends Layer {

  name              = 'Political Map';
  featureCollection = null;
  file              = 'political-map.json';
  svg               = null;
  map               = null;

  stroke = '#CAD2D3';
  fill   = '#F6F6F4';

  /**
   * Initialize own layer and subsequent layer.
   * @param {object} mainLayer
   */
  initialize(mainLayer) {
    this.mainLayer = mainLayer;
    this.initializeOwnVectorLayer();

    if (!this.featureCollection) {
      this.fetch();
    }
    else {
      this.load();
    }

    this.layers.forEach(layer => {
      layer.initialize(this);
    });
  }

  /**
   * Draw own layer.
   */
  draw() {
    this.ownVectorLayer
      .selectAll('path')
      .data(this.featureCollection.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .style('stroke', this.stroke)
      .attr('fill', this.fill)
  }

  /**
   * Fetch the map.
   * @return {Promise}
   */
  fetchFeatureCollection() {
    return new Promise((resolve, reject) => {
      d3.json(this.file, (error, response) => {
        if (error) {
          return reject(error);
        }
        this.featureCollection = response;
        resolve();
      });
    });
  }

  /**
   * Fetch every needed piece of data and load afterwards.
   */
  fetch() {
    Promise.all([
      this.fetchFeatureCollection()
    ])
      .then(() => {
        this.load();
      })
      .catch(error => {
        console.error(error);
      })
  }

}
