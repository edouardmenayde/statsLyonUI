import moment from 'moment';

export class hourFormatValueConverter {

  formatting   = 'HH:mm';
  defaultValue = '∞:∞';

  toView(value) {

    if (!value) {
      return this.defaultValue;
    }

    if (moment.isMoment(value)) {
      return value.format(this.formatting);
    }

    return moment(value).format(this.formatting);
  }
}
