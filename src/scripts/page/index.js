import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import moment from 'moment';
import {logger} from "../main";

@inject(Endpoint.of('api'))
export class Index {

  availability = null;

  from = moment().subtract(2, 'hours').format('YYYY-MM-DD');

  to = moment().add(1, 'day').format('YYYY-MM-DD');

  mostUsedStations = [];

  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  fetchMostUsedStations() {
    this.endpoint
      .find('status/most-used-stations', {
        from: moment(this.from).utc().format(),
        to  : moment(this.to).utc().format(),
        max : 6
      })
      .then(response => {
        this.mostUsedStations = response;
      })
  }

  fetchAvailability() {
    this.endpoint
      .find('status/availability')
      .then(response => {
        this.availability = response;
        this.percent      = (this.availability.value * 100).toFixed(2);
      })
      .catch(error => {
        logger.error(error);
      })
  }

  attached() {
    this.fetchAvailability();
    this.fetchMostUsedStations();
  }

}
