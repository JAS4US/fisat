import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }

  transform(items: any, value:string,label:string):any[] {
    //return null;
    if(!items) return[];
    if(!value) return items;
    if(value==''||value==null)return [];
    return items.filter(e=>e[label].toLowerCase().indexOf(value)>-1);
    // return items.filter(e=>e[label].indexOf(value)>-1);
  }

}
