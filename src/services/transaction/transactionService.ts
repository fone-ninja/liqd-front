import * as transactionResource from "@/services/transaction/transactionResource";

export const createTransactions = () => {
  return transactionResource.createTransactions();
};

export const getTransaction = (transactionId: string) => {
  return transactionResource.getTransaction(transactionId);
};

export const getTransactions = (params?: object) => {
  return transactionResource.getTransactions(params);
};
