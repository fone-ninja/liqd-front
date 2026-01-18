import type { UserSigninResponse } from "./auth";

export interface QuoteDTO {
  base: string;
  quote: string;
  amount: number;
}

export interface QuoteResponse {
  id: number;
  quote_id: string;
  offer_price: string;
  unit_price: string;
  created_at_api: string;
  due_at_api: string;
  user_id: number;
  amount: number;
  updated_at: string;
  created_at: string;
}

export type Quote = QuoteResponse & {};
