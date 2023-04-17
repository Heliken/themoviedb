import { Pipe, PipeTransform } from '@angular/core';
import { Cast } from 'src/app/types/credits';

export type CastWithJobs = Omit<Cast, 'job'> & { jobs: string[] };

@Pipe({
  name: 'groupCastByName',
})
export class GroupCastByNamePipe implements PipeTransform {
  transform(value: Cast[]): CastWithJobs[] {
    const castWithJobsMap = value.reduce(
      (map: Map<string, CastWithJobs>, cast: Cast) => {
        const { job, ...rest } = cast;
        const inMap = map.get(cast.name);

        if (job) {
          inMap
            ? inMap.jobs.push(job)
            : map.set(cast.name, { ...rest, jobs: [job] });
        }

        return map;
      },
      new Map<string, CastWithJobs>()
    );

    return Array.from(castWithJobsMap.values());
  }
}
