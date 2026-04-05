import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.home, href: '#home' },
    { label: t.about, href: '#about' },
    { label: t.projects, href: '#projects' },
    { label: t.contact, href: '#contact' },
  ];

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#020617]/90 backdrop-blur-md border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-3 group"
          id="nav-logo"
        >
          <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:border-cyan-400/50 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M5 15l5-5 5 5M5 9l5-5 5 5" stroke="#67e8f9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-white text-sm font-semibold leading-none">Duta Suksesi F.</p>
            <p className="text-white/40 text-xs mt-0.5">{t.role}</p>
          </div>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              id={`nav-${link.label.toLowerCase()}`}
              className="text-white/50 text-sm hover:text-white transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/5 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300"
            aria-label="Toggle language"
          >
            <span className={`text-[10px] font-bold ${lang === 'ID' ? 'text-cyan-400' : 'text-white/20'}`}>ID</span>
            <div className="w-6 h-3 rounded-full bg-white/10 relative">
              <div className={`absolute top-0.5 w-2 h-2 rounded-full bg-cyan-400 transition-all duration-300 ${lang === 'EN' ? 'right-0.5' : 'left-0.5'}`} />
            </div>
            <span className={`text-[10px] font-bold ${lang === 'EN' ? 'text-cyan-400' : 'text-white/20'}`}>EN</span>
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleLang}
            className="flex items-center px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-bold text-cyan-400"
          >
            {lang}
          </button>
          <button
            className="text-white/60 hover:text-white transition"
            onClick={() => setMenuOpen(!menuOpen)}
            id="nav-mobile-toggle"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-md border-t border-white/5 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-white/60 text-sm hover:text-white transition-colors text-left"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};