import {inject, customElement, bindable} from 'aurelia-framework';

@customElement('layer-selector-repeater')
export class LayerSelectorRepeater {
  @bindable tree = {};
}

export class KeysValueConverter {
  toView(obj) {
    return Reflect.ownKeys(obj);
  }
}
