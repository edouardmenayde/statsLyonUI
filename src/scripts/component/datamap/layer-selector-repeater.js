import {inject, customElement, bindable} from 'aurelia-framework';
import {LayerManager} from './layer-manager';

@inject(LayerManager)
@customElement('layer-selector-repeater')
export class LayerSelectorRepeater {
  @bindable tree = {};

  constructor(layerManager) {
    this.layerManager = layerManager;
  }
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
