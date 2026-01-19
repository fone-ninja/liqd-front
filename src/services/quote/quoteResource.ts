import type {
  QuoteResponse,
  QuoteCreationDTO,
  QuoteCreationResponse,
} from "@/types/quote";
import http from "@/utils/http";

export const getLiveCotation = (params: object) => {
  return http
    .get("https://api.binance.com/api/v3/ticker/price", { params })
    .then(({ data }) => data);
};

export const getQuote = (): Promise<QuoteResponse> => {
  return http.get("/quote").then(({ data }) => data);
};

export const createQuote = (
  data: QuoteCreationDTO
): Promise<QuoteCreationResponse> => {
  return http.post("/quote", data).then(({ data }) => data);
};
