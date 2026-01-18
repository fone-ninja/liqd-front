import * as transactionService from "@/services/transaction/transactionService";

export default function useTransaction() {
  const createTransactions = async () => {
    try {
      const data = await transactionService.createTransactions();
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getTransaction = async (transactionId: string) => {
    try {
      const data = await transactionService.getTransaction(transactionId);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const getTransactions = async (params?: object) => {
    try {
      const data = await transactionService.getTransactions(params);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return {
    createTransactions,
    getTransaction,
    getTransactions,
  };
}
