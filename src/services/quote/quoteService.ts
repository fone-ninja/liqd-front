import * as quoteResource from "@/services/quote/quoteResource";

export const getLiveCotation = ({ symbol = "USDTBRL" }) => {
  return quoteResource.getLiveCotation({ symbol });
};

export const getQuote = () => {
  return quoteResource.getQuote();
};

export const createQuote = () => {
  return quoteResource.createQuote();
};

export const createTransactions = () => {
  return quoteResource.createTransactions();
};
