import { PersonDTO } from './person-dto';

export interface CreditsDTO {
  cast: CastDTO[];
  crew: CastDTO[];
}

export type CastDTO = PersonDTO & CastDetailsDTO;

export interface CastDetailsDTO {
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}
