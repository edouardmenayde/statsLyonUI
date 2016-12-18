import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {DOM} from 'aurelia-pal';
import * as d3 from 'd3';


@customElement('datapie')
export class Datapie {

  width = null;

  height = null;

  outerRadius = null;

  innerRadius = null;

  svgElement = null;

  @bindable()
  @observable()
  percent = null;

  range = {
    min: 0,
    max: 100
  };

  @bindable()
  name = null;

  @bindable()
  fill = '#CD2A41';

  duration = 500;

  CIRCLE_RADIUS = 360.0;

  SEMI_CIRCLE_RADIUS = 180;

  TAU = Math.PI * 2;

  percentChanged() {
    this.update();
  }

  constructor() {
    this.windowResizeEventHandler = () => {
      this
        .setSize()
        .draw()
        .update()
    }
  }

  setSize() {
    this.height = this.svgContainer.clientHeight;
    this.width  = this.svgContainer.clientWidth;

    const larger = Math.min(this.height, this.width);

    this.outerRadius = larger / 3;
    this.innerRadius = this.outerRadius * (80 / 100);

    return this;
  }

  arcTween(initial) {
    const interpolate = d3.interpolate(this._current, initial);
    this._current     = interpolate(0);
    return (t) => {
      return this.arc(interpolate(t));
    }
  }

  paths(numerators) {
    return numerators.map((numerator) => {

      const degrees = ((numerator - this.range.min) / (this.range.max - this.range.min)) * this.CIRCLE_RADIUS;
      const radians = degrees * (Math.PI / this.SEMI_CIRCLE_RADIUS);

      return {
        value     : numerator,
        startAngle: 0,
        endAngle  : radians
      };
    });
  }

  update() {
    this.circle
      .datum([this.percent])
      .selectAll('path')
      .data(this.paths.bind(this))
      .transition()
      .duration(this.duration)
      .attrTween('d', this.arcTween.bind(this));

    this.circleTitle
      .datum([this.percent])
      .selectAll('text')
      .data(this.paths.bind(this))
      .text((datum => {
        return `${datum.value} %`;
      }));

    return this;
  }

  draw() {

    if (this.svg) {
      this.svg.selectAll('*').remove();
    }

    this.arc = d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(this.outerRadius)
      .startAngle(0);

    this.svg = d3
      .select(this.svgElement);

    this.backGroundCircle = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.backGroundCircle
      .append('path')
      .datum({endAngle: this.TAU})
      .style('fill', '#ddd')
      .attr('d', this.arc);

    this.circle = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.circle
      .datum([0])
      .selectAll('path')
      .data(this.paths.bind(this))
      .enter()
      .append('path')
      .attr('fill', this.fill)
      .attr('d', this.arc)
      .each((datum) => {
        this._current = datum;
      });

    this.circleTitle = this.svg
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.circleTitle
      .datum([0])
      .selectAll('text')
      .data(this.paths.bind(this))
      .enter()
      .append('text')
      .attr('class', 'percentageText')
      .attr('font-size', `${this.width} %`)
      .attr('dy', '.4em')
      .attr('text-anchor', 'middle')
      .text((d) => {
        return `${d.value} %`;
      });


    return this;
  }

  attached() {

    window.addEventListener('resize', this.windowResizeEventHandler);

    this.setSize();

    this.draw();
  }

  detached() {
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

}
