import http from "@/utils/http";

export const createTransactions = () => {
  return http.post("/transactions").then(({ data }) => data);
};

export const getTransaction = (transactionId: string) => {
  return http.get(`/transactions/${transactionId}`).then(({ data }) => data);
};

export const getTransactions = (params?: object) => {
  return http.get("/transactions", { params }).then(({ data }) => data);
};
