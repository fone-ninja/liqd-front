type FormatCurrencyParams = {
  value: number;
  maximumFractionDigits?: number;
  localeString?: string;
  symbol?: string;
};

export const formatCurrency = ({
  value,
  maximumFractionDigits = 4,
  localeString = "pt-BR",
  symbol = "R$",
}: FormatCurrencyParams) => {
  const localConfig = {
    minimumFractionDigits: 2,
    maximumFractionDigits,
  };

  return `${symbol} ${Number(value).toLocaleString(localeString, localConfig)}`;
};
