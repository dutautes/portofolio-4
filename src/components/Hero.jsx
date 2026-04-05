import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';
import SplitText from './SplitText';
import Lanyard from './Lanyard';

export const Hero = ({ isReady }) => {
  const containerRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  useEffect(() => {
    if (!isReady) return;
    
    const el = containerRef.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-fade]');
    items.forEach((item, i) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(24px)';
      item.style.transition = `opacity 0.7s ease ${i * 0.15}s, transform 0.7s ease ${i * 0.15}s`;
      requestAnimationFrame(() => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 100);
      });
    });
  }, [lang, isReady]);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-[110vh] flex items-center px-6 md:px-20 pt-32 pb-16 relative overflow-hidden"
      ref={containerRef}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl z-10">
          {/* Heading */}
          <div className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            <SplitText
              key={`h1-${lang}`}
              text={t.hi}
              className="inline"
              delay={60}
              duration={1.25}
              splitType="words"
              textAlign="left"
              tag="span"
              isReady={isReady}
            />{" "}
            <SplitText
              key={`h2-${lang}`}
              text="Duta."
              className="inline text-cyan-300"
              delay={60}
              duration={1.25}
              splitType="words"
              textAlign="left"
              tag="span"
              isReady={isReady}
            />
            <br />
            <SplitText
              key={`h3-${lang}`}
              text={t.solutions}
              className="inline"
              delay={60}
              duration={1.25}
              splitType="words"
              textAlign="left"
              tag="span"
              isReady={isReady}
            />
          </div>

          {/* Subtext */}
          <p data-fade className="text-white/50 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            {t.sub}
          </p>

          {/* Buttons */}
          <div data-fade className="flex flex-wrap gap-4">
            <button
              id="hero-view-projects"
              onClick={() => scrollTo('#projects')}
              className="px-6 py-3 bg-cyan-300 hover:bg-cyan-200 text-slate-900 text-sm font-semibold rounded-full transition-all duration-200 flex items-center gap-2"
            >
              {t.viewProjects}
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              id="hero-contact"
              onClick={() => scrollTo('#contact')}
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white/70 hover:text-white text-sm font-medium rounded-full transition-all duration-200"
            >
              {t.contactMe}
            </button>
          </div>
        </div>

        {/* Right Visual (Lanyard) */}
        <div data-fade className="flex-1 w-full h-[600px] lg:h-[800px] relative -mt-20 lg:mt-0">
          {isReady && <Lanyard position={[0, 0, 20]} gravity={[0, -20, 0]} />}
        </div>
      </div>
    </section>
  );
};