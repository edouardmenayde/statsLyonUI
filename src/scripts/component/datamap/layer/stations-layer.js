import {Layer} from "../layer";
import {parentLayer} from "../decorator/parent-layer";
import {scaleLinear} from "d3-scale";
import moment from "moment";
import {logger} from "../../../main";

@parentLayer('PoliticalMapLayer')
export class StationsLayer extends Layer {

  stations = [];

  fill = '#6B6B6B';

  initialize() {
    this.fetch();
  }

  /**
   * Draw the stations points.
   */
  draw() {
    const radius = scaleLinear()
      .domain([0, 40])
      .range([2, 9]);

    this.vectorLayer
      .selectAll('path')
      .data(this.stations[0].docs.hits.hits)
      .enter()
      .append('circle')
      .attr('location', (feature) => {
        const p = this.layerManager.getParent(this).projection([feature._source.location.lon, feature._source.location.lat]);

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
      .attr('fill', this.fill);
    // .on('mouseover', (station) => {
    //   this.mainLayer.tooltip.setValue(`${station._source.name} : ${station._source.availableStands}`);
    //   this.mainLayer.tooltip.setPosition({
    //     x: d3.event.layerX,
    //     y: d3.event.layerY
    //   }, this.mainLayer.width);
    //   this.mainLayer.tooltip.show();
    // })
    // .on('mouseout', this.hideTooltip.bind(this));
  }

  /**
   * Fetch stations points.
   * @return {Promise}
   */
  fetchStations() {
    let fiveHoursBefore = moment()
      .subtract(5, 'hours')
      .utc()
      .format();
    let now             = moment.utc().format();

    return this.endpoint
      .find(`status?from=${fiveHoursBefore}&to=${now}`)
      .then(response => {
        this.stations = response;
      })
      .catch(error => {
        logger.error(error);
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
        logger.error(error);
      })
  }

  /**
   * Show a tooltip for each station point on the map.
   * @param {Object} feature
   */
  showTooltip(feature) {
    // this.mainLayer.tooltip.setValue(feature.properties.prettyName);
    // this.mainLayer.tooltip.setPosition({
    //   x: d3.event.layerX,
    //   y: d3.event.layerY
    // }, this.mainLayer.width);
    // this.mainLayer.tooltip.show();
  }

  /**
   * Hide the tooltip.
   */
  hideTooltip() {
    // this.mainLayer.tooltip.hide();
  }
}
