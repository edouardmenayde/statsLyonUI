import {inject, customElement} from 'aurelia-framework';
import {LayerManager} from './layer-manager';

@inject(LayerManager)
@customElement('layer-selector')
export class LayerSelector {

  constructor(layerManager) {
    this.layerManager = layerManager;
  }

}
