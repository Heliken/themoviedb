import { Pipe, PipeTransform } from '@angular/core';
import { Cast } from 'src/app/types/credits';

export type CastWithJobs = Omit<Cast, 'job'> & { jobs: string[] };

@Pipe({
  name: 'groupCastByName',
})
export class GroupCastByNamePipe implements PipeTransform {
  transform(value: Cast[]): CastWithJobs[] {
    const castWithJobsMap = value.reduce(
      (map: Map<number, CastWithJobs>, cast: Cast) => {
        const { job, ...rest } = cast;
        const inMap = map.get(cast.id);

        if (job) {
          inMap
            ? inMap.jobs.push(job)
            : map.set(cast.id, { ...rest, jobs: [job] });
        }

        return map;
      },
      new Map<number, CastWithJobs>()
    );

    return Array.from(castWithJobsMap.values());
  }
}
