import { TFunction } from "i18next";
import { createContext, useContext } from "react";
import { useTranslation } from "react-i18next";

interface Language {
  nativeName: string;
}

interface LanguageContextType {
  t: TFunction;
  i18n: any;
  onClickLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  languages: Record<string, Language>;
  currentLanguage: string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const languages = {
    en: { nativeName: "English" },
    es: { nativeName: "Spanish" },
  };

  const { t, i18n } = useTranslation();

  const onClickLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e.target.value;
    i18n.changeLanguage(language);
  };

  return (
    <LanguageContext.Provider
      value={{
        t,
        i18n,
        onClickLanguageChange,
        languages,
        currentLanguage: i18n.language,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageContextProvider"
    );
  }
  return context;
};
