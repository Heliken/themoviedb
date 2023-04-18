import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapGet',
})
export class MapGetPipe<K, V> implements PipeTransform {
  transform(map: Map<K, V>, key: K): V | undefined {
    return map.get(key);
  }
}
