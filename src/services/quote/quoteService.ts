import * as quoteResource from "@/services/quote/quoteResource";
import type { QuoteDTO } from "@/types/quote";

export const getLiveCotation = ({ symbol = "USDTBRL" }) => {
  return quoteResource.getLiveCotation({ symbol });
};

export const getQuote = () => {
  return quoteResource.getQuote();
};

export const createQuote = (data: QuoteDTO) => {
  return quoteResource.createQuote(data);
};

export const createTransactions = () => {
  return quoteResource.createTransactions();
};
