import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {DOM} from 'aurelia-pal';
import * as d3 from "d3";
import removeAccents from "remove-accents";
import {Homefront} from 'homefront';
import screenfull from 'screenfull';

@customElement('datamap')
@inject(Endpoint.of('api'))
export class Datamap {

  @observable()
  width = null;

  height = 650;

  @observable()
  featureCollection = null;


  @bindable()
  traffic = null;

  @bindable()
  file = null;

  @bindable()
  dataset = null;

  @bindable()
  stationsStats = [];

  @bindable()
  colorRange = ['#edf8e9', '#bae4b3', '#74c476', '#238b45'];

  @observable()
  stationSelected = 0;

  projection = null;

  path = null;

  map = null;

  svgContainer = null;

  svgElement = null;

  stationSelectedChanged() {
    this.reloadMap();
  }

  widthChanged() {
    this.reloadMap();
  }

  featureCollectionChanged() {
    this.setSize();
  }

  featuresTestChanged() {
    this.reloadMap();
  }

  setSize() {
    this.height = this.svgContainer.clientHeight;
    this.width  = this.svgContainer.clientWidth;
  }

  constructor(endpoint) {
    this.endpoint                 = endpoint;
    this.windowResizeEventHandler = () => {
      this.setSize();
    };
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

  zoom() {
    this.map.attr('transform', `translate(${d3.event.transform.x} ${d3.event.transform.y})scale(${d3.event.transform.k})`);
  }

  setupMap() {
    if (this.map) {
      d3.select(this.svgElement).selectAll('*').remove();
    }

    this.projection = d3.geoMercator();
    this.projection
      .center([9, 45])
      .scale(1000)
      .translate([this.width / 2, this.height / 2]);

    this.projection2 = d3.geoMercator();
    this.projection2
      .center([9, 45])
      .scale(1000)
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath().projection(this.projection);

    this.path2 = d3.geoPath().projection(this.projection2);

    this.zoomBehavior = d3
      .zoom()
      .duration(750)
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [this.width, this.height]])
      .on('zoom', this.zoom.bind(this));

    d3.select(this.svgElement).call(this.zoomBehavior);

    this.map = d3.select(this.svgElement)
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    this.mapVectors = this.map.append('g').attr('class', 'polygon');

    this.roadSections = this.map.append('g').attr('class', 'polygon');

    this.stationsVectors = this.map.append('g').attr('class', 'polygon');


    this.projection.scale(1).translate([0, 0]);
    this.projection2.scale(1).translate([0, 0]);
  }

  setProjection2() {
    const [[left, top], [right, bottom]] = this.path.bounds(this.trafficCollection);

    const larger       = Math.max(
      (right - left) / this.width,
      (bottom - top) / this.height
    );
    const SCALING      = .95;
    const scale        = SCALING / larger;
    const centerWidth  = (this.width - scale * (right + left)) / 2;
    const centerHeight = (this.height - scale * (top + bottom)) / 2;
    const translate    = [centerWidth, centerHeight];

    this.projection2.scale(scale).translate(translate);
  }

  setProjection() {
    const [[left, top], [right, bottom]] = this.path.bounds(this.featureCollection);

    const larger       = Math.max(
      (right - left) / this.width,
      (bottom - top) / this.height
    );
    const SCALING      = .95;
    const scale        = SCALING / larger;
    const centerWidth  = (this.width - scale * (right + left)) / 2;
    const centerHeight = (this.height - scale * (top + bottom)) / 2;
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
      .attr('x', this.width / factor)
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

    const stroke = '#303030';
    const fill   = '#121212';

    // const zoom = d3.zoom().x(x).y(y).on('zoom', zoomed);

    this.mapVectors
      .selectAll('path')
      .data(this.featureCollection.features)
      .enter()
      .append('path')
      .attr('id', (feature) => {
        return feature.properties.gid;
      })
      .attr('d', this.path)
      .style('stroke', stroke)
      .attr('fill', fill);

    // .on('mousemove', this.showTooltip.bind(this))
    // .on('mouseout', this.hideTooltip.bind(this))
    // .attr('fill', (feature) => {
    //   const key = normalizeText(feature.properties.prettyName);
    //
    //   const value = homefront.fetch(`data.${key}.${this.dataset.toFetch}`, null);
    //
    //   if (!value) {
    //     return 'white';
    //   }
    //
    //   return this.colorScale(value);
    // });


  }

  drawStations() {

    //@todo: IDEA : change color of growing elements when redrawing

    const radius = d3.scaleLinear()
      .domain([0, 40])
      .range([2, 9]);

    this.stationsVectors
      .selectAll('path')
      .data(this.stationsStats[this.stationSelected].docs.hits.hits)
      .enter()
      .append('circle')
      .attr('location', (feature) => {
        const p          = this.projection([feature._source.location.lon, feature._source.location.lat]);
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
      .on('mouseover', (station) => {
        this.tooltip.setValue(`${station._source.name} : ${station._source.availableStands}`);
        this.tooltip.setPosition({
          x: d3.event.layerX,
          y: d3.event.layerY
        }, this.width);
        this.tooltip.show();
      })
      .on('mouseout', this.hideTooltip.bind(this))
      .attr('fill', '#164F70');
  }

  drawSections() {
    this.roadSections
      .selectAll('path')
      .data(this.trafficCollection.features)
      .enter()
      .append('path')
      .attr('d', this.path2)
      .attr('stroke-width', 0.2)
      .attr('stroke', (feature) => {
        const matchingFeature = this.traffic.values.find((trafficFeature) => {
          return trafficFeature.twgid == feature.properties.twgid;
        });

        const state = matchingFeature ? matchingFeature.etat : '';

        let color;
        switch (state) {
          case 'N':
            color = '#000000';
            break;
          case 'O':
            color = '#FF9632';
            break;
          case 'R':
            color = '#a8002d';
            break;
          case 'V':
            color = '#22ff22';
            break;
          case 'G':
          default:
            color = '#dbdbdb';
            break;
        }
        return color;
      })
      .attr('fill', 'transparent')
    // .on('mouseover', (feature) => {
    //   this.tooltip.setValue(`${feature.properties.code} : ${feature.properties.libelle}`);
    //   this.tooltip.setPosition({
    //     x: d3.event.layerX,
    //     y: d3.event.layerY
    //   }, this.width);
    //   this.tooltip.show();
    // })
    // .on('mouseout', this.hideTooltip.bind(this))
  }

  draw() {
    this.setupMap();
    // this.setColorScale();
    // this.drawLegend();
    this.setProjection2();
    this.drawSections();
    this.setProjection();
    this.drawMap();
    // this.drawStations();
  }

  fullscreen() {
    const map = document.querySelector('.map');

    if (screenfull.enabled) {
      screenfull.toggle(map);
    }

    this.setSize();
  }

  attached() {
    window.addEventListener('resize', this.windowResizeEventHandler);
    d3.json('pvopatrimoinevoiriepvotrafic.json', (error, response) => {
      if (error) {
        console.error(error);
      }
      this.trafficCollection = response;
      d3.json(this.file, (error, response) => {
        if (error) {
          return console.error(error);
        }
        this.featureCollection = response;
        this.stationSelected   = this.stationsStats.length - 1
      });
    });
  }

  detached() {
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

}

function normalizeText(text) {
  return removeAccents(text).toLowerCase().replace(/ /g, '');
}
