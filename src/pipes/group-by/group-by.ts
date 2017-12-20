import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the GroupByPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'group',
})
export class GroupByPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }
}
