import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'))
export class Livecam {

  images = [];

  ONE_MINUTE = 60 * 1000;

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchLivecams() {

    if (this.images.length > 0) {
      return this.timestampImages();
    }

    this.endpoint
      .find('https://download.data.grandlyon.com/ws/rdata/pvo_patrimoine_voirie.pvocameracriter/all.json')
      .then(results => {
        this.images = results.values;
        this.timestampImages();
      })
      .catch(error => {
        console.error(error);
      });
  }

  timestampImages () {
    this.images.forEach(image => {
      image.url += `?${+ new Date()}`
    });
  }

  attached() {
    this.fetchLivecams();
    this.reloadingInterval = setInterval(this.fetchLivecams.bind(this), this.ONE_MINUTE);
  }

  detached() {
    clearInterval(this.reloadingInterval);
  }

}
