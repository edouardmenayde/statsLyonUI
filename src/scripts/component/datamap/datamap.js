import {customElement, inject} from 'aurelia-framework';
import {LayerManager} from './layer-manager';
import {EventAggregator} from 'aurelia-event-aggregator';

import {PoliticalMapLayer} from './layer/political-map-layer';
import {StationsLayer} from './layer/stations-layer';

@inject(LayerManager, EventAggregator)
@customElement('datamap')
export class Datamap {

  canvas;

  constructor(layerManager, eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.layerManager    = layerManager;
    this.layerManager.registerLayers([StationsLayer, PoliticalMapLayer]);
  }

  watchCanvas() {
    this.eventAggregator.subscribe('canvas-ready', () => {
      this.layerManager.populateLayers(this.canvas);
    });
  }

  attached() {
    this.watchCanvas();
  }
}

