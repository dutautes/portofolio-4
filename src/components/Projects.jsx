import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Projects = () => {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang].projects;

  const gradients = {
    'sakupintar-ai': 'from-cyan-900/40 to-slate-800',
    'reminder-app': 'from-blue-900/40 to-slate-800',
    'covid-tracker': 'from-purple-900/40 to-slate-800'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('[data-card]');
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, i * 150);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Reset visibility to re-animate on lang switch
    const currentCards = sectionRef.current?.querySelectorAll('[data-card]');
    currentCards?.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
    });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-20 relative"
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-64 bg-cyan-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-3">
              {t.title}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {t.headline}
            </h2>
          </div>
          <p className="text-white/40 text-sm max-w-xs leading-relaxed lg:text-right">
            {t.sub}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((project) => (
            <div
              key={`${project.id}-${lang}`}
              data-card
              id={`project-${project.id}`}
              className="group rounded-2xl border border-white/10 bg-white/3 overflow-hidden hover:border-white/20 transition-all duration-300"
              style={{ opacity: 0, transform: 'translateY(30px)', transition: 'opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease' }}
            >
              <div className={`h-48 bg-gradient-to-br ${gradients[project.id]} relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
              </div>

              <div className="p-6">
                <h3 className="text-white font-semibold text-lg mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4 min-h-[60px]">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs text-white/50 border border-white/10 rounded-full bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    id={`${project.id}-github`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-white/8 border border-white/10 text-white/60 text-sm hover:text-white hover:bg-white/12 transition-all duration-200"
                  >
                    <GitHubIcon />
                    GitHub
                  </button>
                  <button
                    id={`${project.id}-demo`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-cyan-300 hover:bg-cyan-200 text-slate-900 text-sm font-semibold transition-all duration-200"
                  >
                    <ExternalIcon />
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
