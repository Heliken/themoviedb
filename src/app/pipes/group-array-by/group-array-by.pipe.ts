import { Pipe, PipeTransform } from '@angular/core';

export interface GroupedValues<T> {
  key: string;
  value: T[];
}

@Pipe({
  name: 'groupArrayBy',
})
export class GroupArrayByPipe<T> implements PipeTransform {
  transform(items: T[], key: keyof T): GroupedValues<T>[] {
    return items.reduce((acc: GroupedValues<T>[], val: T) => {
      const keyValue = val[key];
      const keyGroup = acc.find(({ key }) => key === keyValue);

      keyGroup
        ? keyGroup.value.push(val)
        : acc.push({
            key: keyValue as string,
            value: [val],
          });
      return acc;
    }, []);
  }
}
