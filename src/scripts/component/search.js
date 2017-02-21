import {inject, customElement, bindable, observable, bindingMode} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import {Router} from 'aurelia-router';
import {DOM} from 'aurelia-pal';

@customElement('search')
@inject(Endpoint.of('api'), Router)
export class Search {

  @bindable()
  options = null;

  @observable()
  input = null;

  @bindable({defaultBindingMode: bindingMode.twoWay})
  results = [];

  hasFocus = true;

  bodyElement = null;

  resultsElement = null;

  resultsChanged() {
    this.focus();
  }

  inputChanged() {
    if (!this.input) {
      this.resetResults();
      return;
    }
    this.doSearch();
  }

  constructor(apiEndpoint, router) {
    this.apiEndpoint = apiEndpoint;
    this.router      = router;
  }

  resetResults() {
    this.results = [];
  }

  focus() {
    this.hasFocus = true;
  }

  unfocus() {
    this.hasFocus = false;
  }

  doSearch() {
    this.apiEndpoint
      .find(`search?q=${this.input}`)
      .then(response => {
        this.results = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  attached() {
    this.bodyElement = DOM.querySelectorAll('body')[0];
    this.listenToClickEvent();
    this.listenToDoubleClickEvent();
  }

  detached() {
    this.removeClickEventListener();
    this.removeDoubleClickEventListener();
  }

  listenToDoubleClickEvent() {
    this.doubleClickEventListener = this.bodyElement.addEventListener('dblclick', () => {
      return this.handlePageClickEvent();
    });
  }

  removeDoubleClickEventListener() {
    this.bodyElement.removeEventListener('dblclick', this.doubleClickEventListener);
  }

  listenToClickEvent() {
    this.clickEventListener = this.bodyElement.addEventListener('click', () => {
      return this.handlePageClickEvent();
    });
  }

  removeClickEventListener() {
    this.bodyElement.removeEventListener('click', this.clickEventListener);
  }

  getLinkForSelectedItem() {
    const index = this.resultsElement.getSelectedItemIndex() >= 0 ? this.resultsElement.getSelectedItemIndex() : 0;
    return `station/${this.results[index]._source.stationID}`;
  }

  redirectToSelectedSearchResult() {
    this.router.navigate(this.getLinkForSelectedItem());
  }

  handleArrowDown() {

    if (!this.results.length) {
      this.resultsElement.resetSelection();
      return false;
    }

    if (this.resultsElement.getSelectedItemIndex() + 1 >= this.results.length) {
      return false;
    }

    this.unfocus();

    this.resultsElement.selectNextItem();

    return false;
  }

  handleArrowUp() {

    if (!this.results.length) {
      this.resultsElement.resetSelection();
      return false;
    }

    if (this.resultsElement.getSelectedItemIndex() - 1 < 0) {
      this.focus();
      this.resultsElement.resetSelection();
      return false;
    }

    this.unfocus();

    this.resultsElement.selectPreviousItem();

    return false;
  }

  handleEnter() {

    if (!this.results.length) {
      return false;
    }

    this.redirectToSelectedSearchResult();

    this.resultsElement.hide();

    this.resultsElement.resetSelection();

    this.focus();

    return true;
  }

  handleEscape() {
    this.resultsElement.resetSelection();
    this.unfocus();
    this.resultsElement.hide();
    return false;
  }

  handleDefault() {
    this.resultsElement.show();
    return true;
  }

  handlePageClickEvent() {
    this.resultsElement.hide();
    return true;
  }

  handleClickForInputField() {
    this.resultsElement.resetSelection();
    this.focus();
    this.resultsElement.show();
    return false;
  }

  handleKeyDown(event) {

    var output = true;

    switch (event.key) {
      case 'Escape':
        output = this.handleEscape();
        break;
      case 'Enter':
        output = this.handleEnter();
        break;
      case 'ArrowUp':
        output = this.handleArrowUp();
        break;
      case 'ArrowDown':
        output = this.handleArrowDown();
        break;
      default:
        output = this.handleDefault();
    }

    return output;
  }

}
