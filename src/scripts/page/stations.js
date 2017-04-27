import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import moment from 'moment';
import {logger} from "../main";

@inject(Endpoint.of('api'))
export class Stations {

  from = moment().subtract(24, 'hours').format('YYYY-MM-DD');

  to = moment().add(1, 'day').format('YYYY-MM-DD');

  stations = [];

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchStations() {
    this.endpoint
      .find('station')
      .then(response => {
        this.stations = response;
      })
      .catch(error => {
        logger.error(error);
      });
  }

  attached() {
    this.fetchStations();
  }

}
