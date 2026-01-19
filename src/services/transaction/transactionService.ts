import * as transactionResource from "@/services/transaction/transactionResource";

export const createTransactions = (data) => {
  return transactionResource.createTransactions(data);
};

export const getTransaction = (transactionId: string) => {
  return transactionResource.getTransaction(transactionId);
};

export const getTransactions = (params?: object) => {
  return transactionResource.getTransactions(params);
};
