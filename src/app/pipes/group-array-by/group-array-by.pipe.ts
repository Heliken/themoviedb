import { Pipe, PipeTransform } from '@angular/core';

export interface GroupedValues<T> {
  [key: string]: T[];
}

@Pipe({
  name: 'groupArrayBy',
})
export class GroupArrayByPipe<T> implements PipeTransform {
  transform(items: T[], key: keyof T): GroupedValues<T> {
    return items.reduce((acc: GroupedValues<T>, val: T) => {
      const keyValue = val[key];
      if (typeof keyValue !== 'string') {
        throw new Error(
          `Expected ${key.toString()} to be a string, but got ${typeof keyValue}`
        );
      }
      let keyGroup = acc[keyValue];

      keyGroup ? keyGroup.push(val) : (keyGroup = [val]);

      return acc;
    }, {});
  }
}
