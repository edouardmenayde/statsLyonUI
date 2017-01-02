import {inject, bindable, customElement, bindingMode} from 'aurelia-framework';
import c3 from 'c3';

@customElement('chart')
export class Chart {

  @bindable({defaultBindingMode: bindingMode.twoWay})
  settings;

  instance = null;

  chart = null;

  setupBinding() {
    this.settings.bindto = this.chart;
  }

  generate() {
    this.instance = c3.generate(this.settings);
  }

  create() {
    this.setupBinding();
    this.generate();
  }

  reload() {
    this.instance.unload({
      done: () => {
        this.instance.load(this.settings.data)
      }
    });
  }

  redraw () {
    this.instance.flush();
  }

  addYGridLine(properties) {
    this.instance.ygrids.add(properties);
    this.redraw(); // Because of some bugs need to redraw
  }

  removeYGrids() {
    this.instance.ygrids.remove();
  }

  setExtent(boundaries) {
    this.instance.zoom(boundaries);
  }

}
