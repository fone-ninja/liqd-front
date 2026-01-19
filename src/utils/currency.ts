type FormatCurrencyParams = {
  value: number;
  maximumFractionDigits?: number;
  localeString?: string;
  symbol?: string;
  removeSymbol?: boolean;
  hiddenValues?: boolean;
};

export const formatCurrency = ({
  value,
  maximumFractionDigits = 4,
  localeString = "pt-BR",
  symbol = "R$",
  removeSymbol = false,
  hiddenValues = false,
}: FormatCurrencyParams) => {
  const localConfig = {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  };

  if (hiddenValues) {
    return `${symbol} ••••••`;
  }

  if (removeSymbol) {
    return `${Number(value).toLocaleString(localeString, localConfig)}`;
  }

  return `${symbol} ${Number(value).toLocaleString(localeString, localConfig)}`;
};
