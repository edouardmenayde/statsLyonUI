import * as d3 from "d3";
import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import {Layer} from "./layer";
import {StationsLayer} from "./stations-layer";

@inject(StationsLayer)
export class PoliticalMapLayer extends Layer {

  name              = 'Political Map';
  featureCollection = null;
  file              = 'political-map.json';
  svg               = null;
  map               = null;

  constructor(stationsLayer) {
    super();
    this.stationsLayer = stationsLayer;
  }

  initialize(mainLayer) {
    this.mainLayer = mainLayer;
    this.initializeOwnVectorLayer();
    this.fetch();
    this.stationsLayer.initialize(this);
  }

  draw() {
    const stroke = '#303030';
    const fill   = '#121212';

    this.ownVectorLayer
      .selectAll('path')
      .data(this.featureCollection.features)
      .enter()
      .append('path')
      .attr('d', this.path)
      .style('stroke', stroke)
      .attr('fill', fill)
  }

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
