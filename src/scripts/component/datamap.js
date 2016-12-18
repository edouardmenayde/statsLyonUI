import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {DOM} from 'aurelia-pal';
import * as d3 from "d3";
import removeAccents from "remove-accents";
import {Homefront} from 'homefront';


@customElement('datamap')
@inject(Endpoint.of('api'))
export class Datamap {

  @observable()
  width = null;

  height = 750;

  @observable()
  featureCollection = null;

  @observable()
  stats = null;

  @observable()
  differentTowns = null;

  @bindable()
  file = null;

  // @TODO: Make the datamap data

  @bindable()
  dataset = null;

  projection = null;

  path = null;

  map = null;

  @bindable()
  colorRange = ['#edf8e9', '#bae4b3', '#74c476', '#238b45'];

  svgContainer = null;

  svgElement = null;

  widthChanged() {
    this.reloadMap();
  }

  featureCollectionChanged() {
    this.setSize();
  }

  setSize() {
    this.width = this.svgContainer.clientWidth;
  }

  constructor(endpoint) {
    this.endpoint                 = endpoint;
    this.windowResizeEventHandler = () => {
      this.setSize();
    }
  }

  showTooltip(feature) {
    this.tooltip.setValue(feature.properties.prettyName);
    this.tooltip.setPosition({
      x: d3.event.layerX,
      y: d3.event.layerY
    }, this.width);
    this.tooltip.show();
  }

  hideTooltip() {
    this.tooltip.hide();
  }

  reloadMap() {
    this.draw();
  }

  setupMap() {

    if (this.map) {
      this.map.selectAll('*').remove();
    }

    this.projection = d3.geoMercator();
    this.projection.center([9, 45])
      .scale(1000)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath().projection(this.projection);

    this.map = d3.select(this.svgElement)
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    this.vectors = this.map.append('g').attr('class', 'polygon');

    this.projection.scale(1).translate([0, 0]);
  }

  setProjection() {
    const bounds = this.path.bounds(this.featureCollection);
    const left   = bounds[0][0];
    const right  = bounds[1][0];
    const top    = bounds[0][1];
    const bottom = bounds[1][1];

    const larger       = Math.max(
      (right - left) / this.width,
      (bottom - top) / this.height
    );
    const SCALING      = .95;
    const scale        = SCALING / larger;
    const centerWidth  = (this.width - scale * (right + left)) / 2;
    const centerHeight = ((this.height - scale * (top + bottom)) / 2);
    const translate    = [centerWidth, centerHeight];

    this.projection.scale(scale).translate(translate);
  }

  setColorScale() {
    const minStands = d3.min(this.featureCollection.features, (feature) => {
      const key = normalizeText(feature.properties.prettyName);
      if (!this.dataset.data[key]) {
        return;
      }
      return this.dataset.data[key].sum.value;
    });

    const maxStands = d3.max(this.featureCollection.features, (feature) => {
      const key = normalizeText(feature.properties.prettyName);
      if (!this.dataset.data[key]) {
        return;
      }
      return this.dataset.data[key].sum.value;
    });

    this.colorScale = d3.scaleQuantize()
      .domain([minStands, maxStands])
      .range(this.colorRange);
  }

  drawLegend() {

    const squareSize = 20;
    const factor     = 7;

    const legend = this.map
      .append('g')
      .attr('class', 'legend');

    // @Todo:: Could be multiple legend later because of differents way of representing data...

    const legendTitle = legend
      .append('g')
      .attr('class', 'title')
      .selectAll('title')
      .data([this.dataset.title])
      .enter();

    legendTitle
      .append('text')
      .attr('x', this.width / factor )
      .attr('y', this.height - 50)
      .attr('dy', '5px')
      .style("text-decoration", "underline")
      .text((d) => {
        return d
      });


    const legendEntries = legend
      .append('g')
      .attr('class', 'legendEntries')
      .selectAll('legendEntry')
      .data(this.colorScale.range().reverse())
      .enter()
      .append('g')
      .attr('class', 'legendEntry');

    legendEntries.append('rect')
      .attr('x', this.width / factor)
      .attr('y', (d, id) => {
        return this.height - 80 - (id + 1) * squareSize;
      })
      .attr('width', squareSize)
      .attr('height', squareSize)
      .style('stroke', 'black')
      .style('stroke-width', 1)
      .style('fill', (d) => {
        return d;
      });

    legendEntries.append('text')
      .attr('x', this.width / factor + 30)
      .attr('y', (d, id) => {
        return this.height - 70 - (id + 1) * squareSize;
      })
      .attr('dy', '5px')
      .text((d) => {
        const extent = this.colorScale.invertExtent(d);
        const format = d3.format('i');
        return format(+extent[0]) + ' - ' + format(+extent[1]);
      });


    const legendAbsolutePosition = legend.node().getBoundingClientRect();

    const svgAbsolutePosition = this.svgElement.getBoundingClientRect();

    const legendPosition = {
      top   : legendAbsolutePosition.top - svgAbsolutePosition.top,
      left  : legendAbsolutePosition.left - svgAbsolutePosition.left,
      width : legendAbsolutePosition.width,
      height: legendAbsolutePosition.height
    };

    const padding = 30;

    legend
      .append('rect')
      .attr('class', 'legend-wrapper')
      .style('x', legendPosition.left - (padding / 2))
      .style('y', legendPosition.top - (padding / 2))
      .style('width', legendPosition.width + padding)
      .style('height', legendPosition.height + padding);
  }

  drawMap() {

    const homefront = new Homefront(this.dataset, Homefront.MODE_NESTED);

    this.vectors
      .selectAll('path')
      .data(this.featureCollection.features)
      .enter()
      .append('path')
      .attr('id', (feature) => {
        return feature.properties.gid;
      })
      .attr('d', this.path)
      .style('stroke', '#303030')
      .on('mousemove', this.showTooltip.bind(this))
      .on('mouseout', this.hideTooltip.bind(this))
      .attr('fill', (feature) => {
        const key = normalizeText(feature.properties.prettyName);

        const value = homefront.fetch(`data.${key}.${this.dataset.toFetch}`, null);

        if (!value) {
          return 'white';
        }

        return this.colorScale(value);
      });
  }

  draw() {
    this.setupMap();

    this.setProjection();

    this.setColorScale();

    this.drawLegend();

    this.drawMap();
  }

  attached() {
    window.addEventListener('resize', this.windowResizeEventHandler);
    d3.json(this.file, (error, response) => {
      if (error) {
        return console.error(error);
      }
      this.featureCollection = response;
    });
  }

  detached() {
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

}

function normalizeText(text) {
  return removeAccents(text).toLowerCase().replace(/ /g, '');
}
