import { Pipe, PipeTransform } from '@angular/core';
import { Cast } from 'src/app/types/credits';

export type CastWithJobs = Omit<Cast, 'job'> & { jobs: string[] };

@Pipe({
  name: 'groupCastByName',
})
export class GroupCastByNamePipe implements PipeTransform {
  transform(value: Cast[]): CastWithJobs[] {
    return value.reduce((acc: CastWithJobs[], cast: Cast) => {
      const inArray = acc.find(({ name }) => cast.name === name);
      if (inArray && cast.job) {
        inArray.jobs.push(cast.job);
      } else {
        const { job, ...rest } = cast;
        const newValue: CastWithJobs = { ...rest, jobs: [] };
        if (job) {
          newValue.jobs.push(job);
        }
        acc.push(newValue);
      }
      return acc;
    }, []);
  }
}
