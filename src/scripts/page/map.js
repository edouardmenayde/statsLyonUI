import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'))
export class Map {
  colorRange = ['brown', 'steelblue'];

  dataset = null;

  stats = null;

  towns = null;

  setDataset() {
    this.dataset = {
      title  : 'Number of stands',
      data   : this.stats,
      toFetch: 'sum.value'
    };
  }

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchTowns() {
    this.endpoint
      .find('station/town')
      .then(response => {
        this.towns = response;
        this.fetchStats();
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchStats() {
    this.endpoint
      .post('station/stat', {
        query: this.towns
      })
      .then(response => {
        this.stats = response;
        this.setDataset();
      })
      .catch(error => {
        console.error(error);
      });
  }


  attached() {
    this.fetchTowns();
  }
}
