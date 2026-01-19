export interface QuoteResponse {
  source: string;
  price: number;
  symbol: string;
  time: string;
}

export interface QuoteCreationDTO {
  base: string;
  quote: string;
  amount: number;
}

export interface QuoteCreationResponse {
  user_id: number;
  quote_id: string;
  offer_price: string;
  unit_price: string;
  created_at_api: string;
  due_at_api: string;
  amount: number;
  updated_at: string;
  created_at: string;
  id: number;
}

export type Quote = QuoteResponse & {};
