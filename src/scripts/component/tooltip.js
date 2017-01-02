import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {DOM} from 'aurelia-pal';

@customElement('tooltip')
export class Tooltip {

  key   = null;
  value = null;
  _show = false;

  tooltipContainer = null;

  setValue(value) {
    this.key = value;
  }

  setPosition(coordinates, elementWidth) {

    if (coordinates.x < elementWidth / 2) {
      this.top  = coordinates.y + 15;
      this.left = coordinates.x + 15;
      return;
    }

    this.top  = coordinates.y + 15;
    this.left = coordinates.x - this.tooltipContainer.offsetWidth - 30;

  }

  show() {
    this._show = true;
  }

  hide() {
    this._show = false;
  }

}
