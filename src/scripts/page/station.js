import {inject, observable} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';
import moment from 'moment';
import {Notification} from 'aurelia-notification';
import {logger} from '../main';

@inject(Endpoint.of('api'), Notification)
export class Station {

  @observable()
  from = moment().subtract(2, 'hours').format('YYYY-MM-DD');

  @observable()
  to = moment().add(1, 'day').format('YYYY-MM-DD');

  @observable()
  id = null;

  @observable()
  data = {};

  @observable()
  statusDataset = [];

  @observable()
  stats = {};

  chart = null;

  /* eslint-disable key-spacing, no-useless-computed-key */
  settings = {
    data    : {
      x      : 'date',
      columns: [
        ['date'],
        ['Bikes available'],
        ['Stands available']
      ],
      colors : {
        ['Bikes available'] : '#FF940D',
        ['Stands available']: '#14CC3F'
      }
    },
    axis    : {
      x: {
        type  : 'timeseries',
        extent: null,
        tick  : {
          format : '%H:%M',
          count  : 10,
          culling: {
            max: 10
          }
        }
      },
      y: {
        min    : 0,
        padding: {
          top   : 10,
          bottom: 4
        }
      }
    },
    subchart: {
      show: true
    },
    grid    : {
      lines: {
        front: false,
      }
    }
  };
  /* eslint-enable key-spacing, no-useless-computed-key */

  firstLoad = true;

  FIVE_MINUTE = 300000;

  presets = [1, 2, 3, 5, 10];

  idChanged() {
    this.loadStation();
    this.firstLoad = true;
  }

  fromChanged() {
    this.loadStation();
  }

  toChanged() {
    this.loadStation();
  }

  statsChanged() {
    this.loadGrid();
  }

  statusDatasetChanged() {
    this.loadCanvas();
  }

  constructor(apiEndpoint, notification) {
    this.apiEndpoint  = apiEndpoint;
    this.notification = notification;
  }

  attached() {
    this.chart.create();
    this.reloadingInterval = setInterval(this.loadStation.bind(this), this.FIVE_MINUTE);
  }

  detached() {
    clearInterval(this.reloadingInterval);
  }

  activate(queryParameters) {
    this.id = queryParameters.id;
  }

  resetSettings() {
    this.settings.data.columns
      .forEach(column => {
        column.splice(1, column.length);
      });
  }

  loadStation() {

    if (this.firstLoad) {
      this.firstLoad = false;
    }
    else {
      this.notification.info('Data changed');
    }

    this.fetchStationData();
    this.fetchStatusData();
    this.fetchStats();
  }

  addMinimumOnGrid() {
    this.chart.addYGridLine({
      value: this.stats.min,
      text : 'Minimum',
    });
  }

  addMaximumOnGrid() {
    this.chart.addYGridLine({
      value: this.stats.max,
      text : 'Maximum'
    });
  }

  addAverageOnGrid() {
    this.chart.addYGridLine({
      value: this.stats.avg,
      text : 'Average'
    });
  }

  loadGrid() {
    this.chart.removeYGrids();

    this.addMinimumOnGrid();

    this.addMaximumOnGrid();

    this.addAverageOnGrid();
  }

  loadData() {
    this.resetSettings();
    this.statusDataset.forEach(stationStatus => {
      this.settings.data.columns[0].push(new Date(stationStatus._source.createdAt));
      this.settings.data.columns[1].push(stationStatus._source.availableBikes);
      this.settings.data.columns[2].push(stationStatus._source.availableStands);
    });
  }

  setupExtent() {
    const base = moment().subtract(4, 'hours').toDate();
    const now  = moment().toDate();

    this.chart.setExtent([base, now]);
  }

  loadCanvas() {
    this.loadData();

    this.chart.reload();

    this.setupExtent();
  }

  fetchStats() {
    this.apiEndpoint
      .find(`status/${this.id}/available-stands/`)
      .then(response => {
        this.stats = response;
      })
      .catch(error => {
        logger.error(error);
      });
  }

  fetchStatusData() {
    if (!moment(this.from).isValid() || !moment(this.to).isValid()) {
      return;
    }

    this.apiEndpoint
      .find(`status/${this.id}`, {
        from: moment(this.from).utc().format(),
        to  : moment(this.to).utc().format()
      })
      .then(response => {
        this.statusDataset = response;
      })
      .catch(error => {
        logger.error(error);
      });
  }

  fetchStationData() {
    this.apiEndpoint
      .find(`station/${this.id}`)
      .then(response => {
        this.data = response;
      })
      .catch(error => {
        logger.error(error);
      });
  }

}
