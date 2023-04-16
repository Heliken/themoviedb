import { Pipe, PipeTransform } from '@angular/core';

export type SortFunc<T> = (a: T, b: T) => number;

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform<T>(value: T[], sortFunc: SortFunc<T>): T[] {
    return value.sort(sortFunc);
  }
}
