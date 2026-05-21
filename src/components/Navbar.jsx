import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#home' },
    { label: 'Tentang', href: '#about' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Kontak', href: '#contact' },
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
        {/* Logo pengenal & Tombol kembali ke Beranda */}
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
            <p className="text-white/40 text-xs mt-0.5">Siswa Pengembangan Perangkat Lunak</p>
          </div>
        </button>

        {/* Menu Navigasi Layar Lebar (Desktop) */}
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
        </div>

        {/* Tombol Hamburger Menu untuk Layar HP (Mobile) */}
        <div className="flex items-center gap-4 md:hidden">
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

      {/* Tampilan Daftar Menu drop-down (Khusus Mobile) */}
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