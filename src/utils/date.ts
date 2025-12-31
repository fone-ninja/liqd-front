import dayjs from "dayjs";
import { getLocale } from "@/utils/locale";

const DAY_LOCALE_MAP: Record<string, string> = {
  pt: "pt-br",
  en: "en",
  es: "es",
};

const DATE_FORMAT_BY_LOCALE: Record<string, string> = {
  pt: "D [de] MMMM [de] YYYY",
  en: "MMMM D, YYYY",
  es: "D [de] MMMM [de] YYYY",
};

export const setDateLocal = (locale: string) => {
  dayjs.locale(DAY_LOCALE_MAP[locale] ?? "en");
};

export const setInitialDateLocal = () => {
  const savedLocale = getLocale();

  setDateLocal(savedLocale || "en");
};

export const getLongDate = (date: string) => {
  const savedLocale = getLocale();

  return dayjs(date)
    .format(DATE_FORMAT_BY_LOCALE[savedLocale || "en"])
    .toLowerCase();
};
