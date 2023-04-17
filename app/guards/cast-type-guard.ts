import { Cast } from 'src/app/types/credits';
import { Person } from 'src/app/types/person';

export function isCast(media: Person | Cast): media is Cast {
  return 'creditId' in media;
}
