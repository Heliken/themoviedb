export interface AccessTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface LoginResponse {
  success: boolean;
  session_id: string;
}

export interface LoginPost {
  username: string;
  password: string;
  request_token: string;
}
