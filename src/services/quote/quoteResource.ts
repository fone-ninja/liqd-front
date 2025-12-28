import http from "@/utils/http";

export const getLiveCotation = (params: object) => {
  return http
    .get("https://api.binance.com/api/v3/ticker/price", { params })
    .then(({ data }) => data);
};

export const getQuote = () => {
  return http.get("/quote").then(({ data }) => data);
};

export const createQuote = () => {
  return http.post("/quote").then(({ data }) => data);
};

export const createTransactions = () => {
  return http.post("/transactions").then(({ data }) => data);
};
