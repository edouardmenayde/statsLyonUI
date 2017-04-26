import {inject, customElement} from "aurelia-framework";
import {select} from "d3-selection";
import {DOM} from 'aurelia-pal';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('layer-canvas')
@inject(DOM, EventAggregator)
export class LayerCanvas {

  svg;

  instance;

  width;

  height;

  container;

  constructor(DOM, eventAggregator) {
    this.DOM             = DOM;
    this.eventAggregator = eventAggregator;
  }

  /**
   * Set the size according to container of svg
   *
   * @returns {Object}
   */
  setSize() {
    this.height = this.container.clientHeight;
    this.width  = this.container.clientWidth;

    return this;
  }

  /**
   * Clear the svg content using
   *
   * @returns {Object}
   */
  clear() {
    select(this.svg)
      .selectAll('*')
      .remove();

    return this;
  }

  /**
   * Setup the svg using D3
   *
   * @returns {Object}
   */
  setup() {
    this.instance = select(this.svg)
      .attr('width', this.width)
      .attr('height', this.height);

    return this;
  }

  resized() {
    this
      .clear()
      .setSize()
      .setup();
  }

  watchResize() {
    this.DOM.addEventListener('resize', () => this.resized);
  }

  unwatchResize() {
    this.DOM.removeEventListener('resize', () => this.resized);
  }

  attached() {
    this.setSize()
      .setup()
      .watchResize();
  }

  emitReady() {
    this.eventAggregator.emit('canvas-ready');
  }
}
