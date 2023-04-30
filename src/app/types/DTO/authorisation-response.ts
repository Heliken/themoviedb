export interface AccessTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export type NewSessionResponse = {
  success: boolean;
  session_id: string;
};

export interface LoginCredits {
  username: string;
  password: string;
}
