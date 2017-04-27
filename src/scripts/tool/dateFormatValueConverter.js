import moment from 'moment';

export class dateFormatValueConverter {
  toView(value) {
    const format = 'YYYY-MM-DD';

    if (moment.isMoment(value)) {
      return value.format(format);
    }

    return moment(value).format(format);
  }
}
