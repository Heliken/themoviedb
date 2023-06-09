import { FilterFunc } from '../../../pipes/filter/filter.pipe';
import { Cast } from '../../../types/credits';

export function crewFilterFunc(jobs: string[]): FilterFunc<Cast> {
  return (item: Cast) => {
    return item.job ? jobs.includes(item.job?.toLowerCase()) : false;
  };
}
