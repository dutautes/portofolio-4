import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const skills = ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'AWS', 'Git/GitHub', 'UI/UX Design', 'AI Integration'];

export const About = () => {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang].about;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('[data-reveal]');
            items.forEach((item, i) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    // Reset opacity when lang changes so it re-animates if visible
    const items = sectionRef.current?.querySelectorAll('[data-reveal]');
    items?.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-20 relative"
    >
      {/* Ambient */}
      <div className="absolute right-0 top-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Text */}
        <div>
          <p
            data-reveal
            className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-4"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            {t.title}
          </p>
          <h2
            data-reveal
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            {t.headline}
          </h2>
          <div
            data-reveal
            className="text-white/50 text-base leading-relaxed space-y-4"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p className="text-sm italic border-l-2 border-cyan-500/30 pl-4">{t.german}</p>
          </div>
        </div>

        {/* Right: Skills card */}
        <div
          data-reveal
          className="rounded-2xl border border-white/10 bg-white/3 p-8"
          style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-5">
            {t.techStack}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm text-white/70 border border-white/10 rounded-full bg-white/5 hover:border-white/20 hover:text-white transition-all duration-200 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Education card */}
          <div className="rounded-xl bg-white/5 border border-white/8 p-5">
            <p className="text-xs text-white/40 mb-2">{t.eduTitle}</p>
            <ul className="space-y-2">
               <li className="text-white/90 text-sm flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                 {t.edu1}
               </li>
               <li className="text-white/90 text-sm flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                 {t.edu2}
               </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
