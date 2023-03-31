import { MediaType } from './media-type';

export interface Person {
  id: number;
  photo: string | null;
  name: string;
  mediaType: MediaType.Person;
}
