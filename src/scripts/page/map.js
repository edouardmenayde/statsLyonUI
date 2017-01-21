import {inject} from "aurelia-framework";
import {Endpoint} from "aurelia-api";
import moment from "moment";

@inject(Endpoint.of('api'))
export class Map {
  colorRange = ['brown', 'steelblue'];

  dataset = null;

  stats = null;

  stations = null;

  traffic = null;

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

  fetchTraffic() {
    this.endpoint
      .find(`traffic`)
      .then(response => {
        this.traffic = response;
      })
      .catch(error => {
        console.error(error);
      });
  }

  fetchStationsStats() {
    this.endpoint
      .find(`status?from=${moment().subtract(5, 'hours').utc().format()}&to=${moment().utc().format()}`)
      .then(response => {
        this.stations = response;
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
    // this.fetchTowns();
    // this.fetchStationsStats();
    // this.fetchTraffic();
  }
}
