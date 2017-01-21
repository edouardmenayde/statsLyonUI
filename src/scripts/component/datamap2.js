import {inject, customElement, bindable, observable, BindingEngine} from "aurelia-framework";
import {DOM} from "aurelia-pal";
import * as d3 from "d3";
import screenfull from "screenfull";
import {PoliticalMapLayer} from "./political-map-layer";
import {TrafficLayer} from "./traffic-layer";
import moment from "moment";
import "moment-round";

@inject(BindingEngine, PoliticalMapLayer, TrafficLayer)
export class Datamap2 {

  width  = null;
  height = null;
  map    = null;

  fiveMinuteSequence = [];

  selectedTime = 0;

  layers = [];

  selectedIds = [];

  selectedIdsChanged() {
    this.displayOrHideLayers();
  }

  constructor(bindingEngine, politicalMapLayer, trafficLayer) {

    this.bindingEngine = bindingEngine;

    this.layers = [
      politicalMapLayer,
      trafficLayer
    ];

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

  setSize() {
    this.height = this.container.clientHeight;
    this.width  = this.container.clientWidth;
  }

  displayOrHideLayers() {
    for (let i = 0; i < this.layers.length; i++) {

      var itemToBeShown = false;

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

  load() {
    this.setup();
    this.displayOrHideLayers();
  }

  reload() {
    this.load();
  }

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

  clear() {
    d3.select(this.svg).selectAll('*').remove();
  }

  zoom() {
    this.map.attr('transform', `translate(${d3.event.transform.x} ${d3.event.transform.y})scale(${d3.event.transform.k})`);
  }

  fullscreen() {
    if (!screenfull.enabled) return;
    screenfull.toggle(this.parent);
    this.setSize();
  }

  attached() {
    this.setSize();
    this.load();
    this.selectedIdsSubscription = this.bindingEngine
      .collectionObserver(this.selectedIds)
      .subscribe(this.selectedIdsChanged.bind(this));
    window.addEventListener('resize', this.windowResizeEventHandler);
  }

  detached() {
    this.selectedIdsSubscription.dispose();
    window.removeEventListener('resize', this.windowResizeEventHandler);
  }

}
