"use client";

import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLang = (lng : string) => {
    i18n.changeLanguage(lng);
  };

  return ( 
    <div className="h-100 flex justify-center items-center">
      <button onClick={() => changeLang("en")}>English</button>
      <button onClick={() => changeLang("bn")}>বাংলা</button>
    </div>
  );
}