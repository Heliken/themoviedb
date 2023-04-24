import { Pipe, PipeTransform } from '@angular/core';
import { KnownFor, PersonDetailsCombinedCredits } from 'src/app/types/person';

@Pipe({
  name: 'toKnownFor',
})
export class ToKnownForPipe implements PipeTransform {
  transform(value: PersonDetailsCombinedCredits): KnownFor[] {
    /* keep only unique credits as person can be both in cast and crew for one movie */
    const creditsMap = new Map<number, KnownFor>(
      [...value.cast, ...value.crew].map(credit => [credit.id, credit])
    );

    return Array.from(creditsMap.values());
  }
}
