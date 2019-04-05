import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string, formatHour: string): string {
    if (formatHour) {
      return moment(value).format(`Y/MM/DD ${formatHour}`);
    } else {
      return moment(value).format('Y/MM/DD');
    }
  }
}