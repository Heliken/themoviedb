import { Pipe, PipeTransform } from '@angular/core';

export type FindFunc<T> = (item: T) => boolean;

@Pipe({
  name: 'find',
})
export class FindPipe implements PipeTransform {
  transform<T>(value: T[], findFunc: FindFunc<T>): T | undefined {
    return value.find(findFunc);
  }
}
