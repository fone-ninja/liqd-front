export interface UserSigninDTO {
  email: string;
  password: string;
}

export interface UserSigninResponse {
  response_code: number;
  status: string;
  message: string;
  token: string;
  user_info: {
    id: number;
    name: string;
    email: string;
    pix_qr_code: string;
    spread_market_on: string;
    spread_market_off: string;
  };
}

export interface UserSignupDTO {
  name: string;
  email: string;
  password: string;
}
