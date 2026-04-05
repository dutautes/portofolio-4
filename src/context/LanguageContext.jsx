import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('app-lang') || 'ID';
    }
    return 'ID';
  });

  useEffect(() => {
    localStorage.setItem('app-lang', lang);
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'ID' ? 'EN' : 'ID'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
