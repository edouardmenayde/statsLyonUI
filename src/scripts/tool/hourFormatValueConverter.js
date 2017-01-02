import moment from 'moment';

export class hourFormatValueConverter {
  toView(value) {
    const format = 'HH:mm';
    if (moment.isMoment(value)) {
      return value.format(format);
    }
    return moment(value).format(format);
  }
}
