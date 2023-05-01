export interface UserInfo {
  avatar: UserAvatar;
  id: number;
  name: string;
  username: string;
}

export interface UserAvatar {
  gravatar: UserGravatar;
}

export interface UserGravatar {
  hash: string;
}
