import { Pipe, PipeTransform } from '@angular/core';

export type FilterFunc<T> = (item: T) => boolean;

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform<T>(value: T[], filterFunc: FilterFunc<T>): T[] {
    return value.filter(filterFunc);
  }
}
