import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'concat',
})
export class ConcatPipe<T> implements PipeTransform {
  transform(arr1: T[], arr2: T[]): T[] {
    return [...arr1, ...arr2];
  }
}
