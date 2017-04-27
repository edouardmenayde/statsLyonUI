import {inject, customElement} from "aurelia-framework";
import {select} from "d3-selection";
import {PLATFORM} from 'aurelia-pal';
import {EventAggregator} from 'aurelia-event-aggregator';

@customElement('layer-canvas')
@inject(EventAggregator)
export class LayerCanvas {

  svg;

  instance;

  width;

  height;

  container;

  constructor(eventAggregator) {
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
      .setup()
      .emitResized();
  }

  watchResize() {
    PLATFORM.addEventListener('resize', () => this.res);

    return this;
  }

  unwatchResize() {
    PLATFORM.removeEventListener('resize', () => this.resized());
  }

  emitResized() {
    this.eventAggregator.publish('canvas-resized');
  }

  emitReady() {
    this.eventAggregator.publish('canvas-ready');
  }

  attached() {
    this.setSize()
      .setup()
      .watchResize()
      .emitReady();
  }

  detached() {
    this.unwatchResize();
  }
}
