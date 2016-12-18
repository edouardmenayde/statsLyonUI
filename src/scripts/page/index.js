import {inject, customElement, bindable, observable} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'))
export class Index {

  availability = null;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchAvailability() {
    this.endpoint
      .find('status/availability')
      .then(response => {
        this.availability = response;
        this.percent = (this.availability.value * 100).toFixed(2);
      })
      .catch(error => {
        console.error(error);
      })
  }

  attached() {
    this.fetchAvailability();
  }

}
