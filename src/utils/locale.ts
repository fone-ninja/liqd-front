export const getLocale = () => {
  return typeof window !== "undefined" ? localStorage.getItem("locale") : null;
};

export const getInitialLocale = () => {
  const savedLocale = getLocale();

  return savedLocale || "en";
};
