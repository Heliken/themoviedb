import { Person } from './person';

export interface Credits {
  cast: Cast[];
  crew: Cast[];
}

export type Cast = Person & CastDetails;

export interface CastDetails {
  castId?: number;
  character?: string;
  creditId: string;
  order?: number;
  department?: string;
  job?: string;
}
