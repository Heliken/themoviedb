import { UserAvatar } from '../user-info';

export interface UserInfoDTO {
  avatar: UserAvatar;
  id: number;
  iso639_1: string;
  iso3166_1: string;
  name: string;
  includeAdult: boolean;
  username: string;
}
