import {inject, customElement, bindable, observable, BindingEngine} from "aurelia-framework";
import {DOM} from "aurelia-pal";
import * as d3 from "d3";
import screenfull from "screenfull";
import {layer} from "../decorators/layer";
import {PoliticalMapLayer} from "./political-map-layer";
import {TrafficLayer} from "./traffic-layer";
import moment from "moment";
import "moment-round";

/**
 * Datamap
 *
 * @TODO : Rename it to datamap.
 * @TODO: Move away layer selector
 */
@inject(BindingEngine)
@layer(TrafficLayer)
@layer(PoliticalMapLayer)
export class Datamap2 {

  width  = null;
  height = null;
  map    = null;

  selectedIds = [];

  layers;

  selectedIdsChanged() {
    this.displayOrHideLayers();
  }

  /**
   * Setup bases for the map and initialize layers.
   *
   * @param {object} bindingEngine
   */
  constructor(bindingEngine) {

    this.bindingEngine = bindingEngine;

    for (let i = 0; i < this.layers.length; i++) {
      this.selectedIds.push(i);
    }

    this.windowResizeEventHandler = () => {
      this.setSize();
      this.reload();
    };

    this.fiveMinutesSequence = [];

    for (let i = 0; i < 11; i++) {
      let minutes    = 5 * i;
      let minutesAgo = moment().round(5, 'minutes').subtract(minutes, 'minutes');
      this.fiveMinutesSequence.push(minutesAgo);
    }


  }

  /**
   * Set the size of the datamap according to container size.
   */
  setSize() {
    this.height = this.container.clientHeight;
    this.width  = this.container.clientWidth;
  }

  /**
   * Initialize or hide layers depending on their checkbox status.
   * @TODO : init does not belong here it should only be display or hide.
   */
  displayOrHideLayers() {
    for (let i = 0; i < this.layers.length; i++) {

      let itemToBeShown = false;

      for (let j = 0; j < this.selectedIds.length; j++) {
        if (i === this.selectedIds[j]) {
          itemToBeShown = true;
        }
      }

      if (itemToBeShown) {
        this.layers[i].initialize(this);
      }
      else {
        this.layers[i].clear();
      }
    }
  }

  /**
   * Load the datamap.
   */
  load() {
    this.setup();
    this.displayOrHideLayers();
  }

  /**
   * Reload the datamap using load method.
   */
  reload() {
    this.load();
  }

  /**
   * Setup the datamap using d3.
   */
  setup() {
    this.clear();

    this.map = d3.select(this.svg)
      .attr('width', this.width)
      .attr('height', this.height);

    this.zoomBehavior = d3
      .zoom()
      .duration(750)
      .scaleExtent([1, 10])
      .translateExtent([[0, 0], [this.width, this.height]])
      .on('zoom', this.zoom.bind(this));

    d3.select(this.svg).call(this.zoomBehavior);
  }

  /**
   * Clear the datamap.
   */
  clear() {
    d3.select(this.svg).selectAll('*').remove();
  }

  /**
   * Zoom on the datamap.
   */
  zoom() {
    this.map.attr('transform', `translate(${d3.event.transform.x} ${d3.event.transform.y})scale(${d3.event.transform.k})`);
  }

  /**
   * Go fullscreen.
   */
  fullscreen() {
    if (!screenfull.enabled) return;
    screenfull.toggle(this.parent);
    this.setSize();
  }

  /**
   * Set the size, load the datamap, subscribe to checkboxes change and resize events.
   */
  attached() {
    this.setSize();
    this.load();
    this.selectedIdsSubscription = this.bindingEngine
      .collectionObserver(this.selectedIds)
      .subscribe(this.selectedIdsChanged.bind(this));
    window.addEventListener('resize', this.windowResizeEventHandler);
  }

  /**
   * Unsubscribe from checkboxes change and resize events.
   */
  detached() {
    this.selectedIdsSubscription.dispose();
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

}
