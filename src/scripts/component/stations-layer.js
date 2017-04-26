import * as d3 from "d3";
import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import moment from "moment";
import {Layer} from "./layer";

@inject(Endpoint.of('api'))
export class StationsLayer extends Layer {

  stations = [];

  fill = '#6B6B6B';

  constructor(endpoint) {
    super();
    this.endpoint = endpoint;
  }

  /**
   * Initialize the layer.
   * @param {object} parentLayer
   */
  initialize(parentLayer) {
    this.parentLayer = parentLayer;
    this.mainLayer   = parentLayer.mainLayer;
    this.initializeOwnVectorLayer();

    if (this.stations.length == 0) {
      this.fetch();
    }
    else {
      this.load();
    }
  }

  /**
   * Draw the stations points.
   */
  draw() {
    const radius = d3.scaleLinear()
      .domain([0, 40])
      .range([2, 9]);

    this.ownVectorLayer
      .selectAll('path')
      .data(this.stations[0].docs.hits.hits)
      .enter()
      .append('circle')
      .attr('location', (feature) => {
        const p          = this.parentLayer.projection([feature._source.location.lon, feature._source.location.lat]);
        feature.location = {
          lat: p[0],
          lon: p[1]
        };
        return feature;
      })
      .attr('cx', feature => feature.location.lat)
      .attr('cy', feature => feature.location.lon)
      .attr('r', station => {
        return radius(station._source.availableStands);
      })
      .attr('fill', this.fill)
      .on('mouseover', (station) => {
        this.mainLayer.tooltip.setValue(`${station._source.name} : ${station._source.availableStands}`);
        this.mainLayer.tooltip.setPosition({
          x: d3.event.layerX,
          y: d3.event.layerY
        }, this.mainLayer.width);
        this.mainLayer.tooltip.show();
      })
      .on('mouseout', this.hideTooltip.bind(this));
  }

  /**
   * Fetch stations points.
   * @return {Promise}
   */
  fetchStations() {
    return this.endpoint
      .find(`status?from=${moment().subtract(5, 'hours').utc().format()}&to=${moment().utc().format()}`)
      .then(response => {
        this.stations = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  /**
   * Fetch every needed piece of data and loads afterwards.
   */
  fetch() {
    Promise.all([
      this.fetchStations()
    ])
      .then(() => {
        this.load();
      })
      .catch(error => {
        console.error(error);
      })
  }

  /**
   * Show a tooltip for each station point on the map.
   * @param {Object} feature
   */
  showTooltip(feature) {
    this.mainLayer.tooltip.setValue(feature.properties.prettyName);
    this.mainLayer.tooltip.setPosition({
      x: d3.event.layerX,
      y: d3.event.layerY
    }, this.mainLayer.width);
    this.mainLayer.tooltip.show();
  }

  /**
   * Hide the tooltip.
   */
  hideTooltip() {
    this.mainLayer.tooltip.hide();
  }

}
