import {json} from "d3-request";
import {Layer} from "../layer";
import {logger} from "../../../main";

export class PoliticalMapLayer extends Layer {

  name = 'Political Map';

  file = 'political-map.json';

  featureCollection;

  svg;

  map;

  stroke = '#CAD2D3';

  fill = '#F6F6F4';

  initialize() {
    this.fetch();
  }

  /**
   * Draw own layer.
   */
  draw() {
    this.vectorLayer
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
   *
   * @return {Promise}
   */
  fetchFeatureCollection() {
    return new Promise((resolve, reject) => {
      json(this.file, (error, response) => {
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
        logger.error(error);
      })
  }
}
