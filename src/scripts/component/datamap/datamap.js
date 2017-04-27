import {customElement, inject} from 'aurelia-framework';
import {LayerManager} from './layer-manager';
import {EventAggregator} from 'aurelia-event-aggregator';

import {PoliticalMapLayer} from './layer/political-map-layer';
import {StationsLayer} from './layer/stations-layer';
import {TrafficLayer} from './layer/traffic-layer';

@customElement('datamap')
@inject(LayerManager, EventAggregator)
export class Datamap {

  canvas;

  constructor(layerManager, eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.layerManager    = layerManager;
    this.layerManager.registerLayers([StationsLayer, PoliticalMapLayer, TrafficLayer]);
  }

  watchCanvas() {
    this.eventAggregator.subscribe('canvas-ready', () => {
      this.layerManager.populateLayers(this.canvas);
    });
    this.eventAggregator.subscribe('canvas-resized', () => {
      this.layerManager.reloadAllLayers();
    });
  }

  attached() {
    this.watchCanvas();
  }
}

