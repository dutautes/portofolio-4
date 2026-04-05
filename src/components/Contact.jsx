import { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" />
    <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const ArrowUpRight = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M4 16L16 4M16 4H8M16 4v8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const contacts = [
  {
    id: 'contact-email',
    icon: <MailIcon />,
    label: 'dutasuksesif@gmail.com',
    href: 'mailto:dutasuksesif@gmail.com',
  },
  {
    id: 'contact-github',
    icon: <GitHubIcon />,
    label: 'GitHub',
    href: 'https://github.com/dutautes',
  },
  {
    id: 'contact-linkedin',
    icon: <LinkedInIcon />,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/dutasuksesif',
  },
];

export const Contact = () => {
  const sectionRef = useRef(null);
  const { lang } = useLanguage();
  const t = translations[lang].contact;

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

    // Reset for lang change
    const innerItems = sectionRef.current?.querySelectorAll('[data-reveal]');
    innerItems?.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
    });

    return () => observer.disconnect();
  }, [lang]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/3 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          <div>
            <p
              data-reveal
              key={`ct-title-${lang}`}
              className="text-xs font-semibold tracking-[0.2em] text-white/30 uppercase mb-4"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {t.title}
            </p>
            <h2
              data-reveal
              key={`ct-head-${lang}`}
              className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {t.headline}
            </h2>
            <p
              data-reveal
              key={`ct-sub-${lang}`}
              className="text-white/50 text-sm leading-relaxed"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
            >
              {t.sub} <br /> {t.reachOut}
            </p>
          </div>

          <div
            data-reveal
            className="flex flex-col gap-3"
            style={{ opacity: 0, transform: 'translateY(20px)', transition: 'all 0.6s ease' }}
          >
            {contacts.map((c) => (
              <a
                key={c.id}
                id={c.id}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3 text-white/60 group-hover:text-white/80 transition-colors">
                  <span className="text-white/40 group-hover:text-white/60 transition-colors">{c.icon}</span>
                  <span className="text-sm">{c.label}</span>
                </div>
                <span className="text-white/30 group-hover:text-white/60 transition-colors">
                  <ArrowUpRight />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
