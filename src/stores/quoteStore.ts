import { defineStore } from "pinia";
import * as quoteService from "@/services/quote/quoteService";
import type { Quote, QuoteCreationDTO } from "@/types/quote";

export type QuoteState = {
  quote: Quote | null;
};

export const quoteStore = defineStore("quote", {
  state: (): QuoteState => ({
    quote: null,
  }),
  actions: {
    async getQuote() {
      try {
        const data = await quoteService.getQuote();
        this.setQuote(data);
      } catch (error) {
        throw error;
      }
    },
    async createQuote(quoteData: QuoteCreationDTO) {
      try {
        const data = await quoteService.createQuote(quoteData);
        return data;
      } catch (error) {
        throw error;
      }
    },
    setQuote(quote: Quote) {
      this.quote = quote;
    },
  },
  getters: {
    quoteData: (state) => state.quote,
  },
});
