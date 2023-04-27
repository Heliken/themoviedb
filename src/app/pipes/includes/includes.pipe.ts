import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
})
export class IncludesPipe<T> implements PipeTransform {
  transform(arr: T[], elem: T): boolean {
    return arr.includes(elem);
  }
}
