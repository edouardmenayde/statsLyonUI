import {customElement, bindable} from 'aurelia-framework';

@customElement('results')
export class Results {

  @bindable()
  dataset = [];

  @bindable()
  display = false;

  selectedItemIndex = -1;

  datasetChanged() {
    if (!this.dataset) {
      return this.hide();
    }
    this.show();
  }

  show() {
    this.display = true;
  }

  hide() {
    this.display = false;
  }

  resetSelection() {
    this.selectedItemIndex = -1;
  }

  selectNextItem() {
    this.selectedItemIndex += 1;
  }

  selectPreviousItem() {
    this.selectedItemIndex -= 1;
  }

  getSelectedItemIndex () {
    return this.selectedItemIndex;
  }

}
