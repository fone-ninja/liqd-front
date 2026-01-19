import type { UserSigninResponse } from "./auth";

export interface QuoteDTO {
  base: string;
  quote: string;
  amount: number;
}

export interface QuoteResponse {
  source: string;
  price: number;
  symbol: string;
  time: string;
}

export type Quote = QuoteResponse & {};
