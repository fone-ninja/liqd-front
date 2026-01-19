import * as quoteResource from "@/services/quote/quoteResource";
import type { QuoteCreationDTO } from "@/types/quote";

export const getQuote = () => {
  return quoteResource.getQuote();
};

export const createQuote = (data: QuoteCreationDTO) => {
  return quoteResource.createQuote(data);
};
