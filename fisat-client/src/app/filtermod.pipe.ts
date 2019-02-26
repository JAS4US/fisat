import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtermod'
})
export class FiltermodPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
