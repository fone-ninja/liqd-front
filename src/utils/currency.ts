type FormatCurrencyParams = {
  value: number;
  maximumFractionDigits?: number;
  localeString?: string;
  symbol?: string;
  removeSymbol?: boolean;
};

export const formatCurrency = ({
  value,
  maximumFractionDigits = 4,
  localeString = "pt-BR",
  symbol = "R$",
  removeSymbol = false,
}: FormatCurrencyParams) => {
  const localConfig = {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  };

  if (removeSymbol) {
    return `${Number(value).toLocaleString(localeString, localConfig)}`;
  }

  return `${symbol} ${Number(value).toLocaleString(localeString, localConfig)}`;
};
