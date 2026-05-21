import { useEffect, useRef } from 'react';
import { projects } from '../data/portfolioData';

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

const gradients = {
  'sakupintar-ai': 'from-cyan-900/40 to-slate-800',
  'reminder-app': 'from-blue-900/40 to-slate-800',
  'covid-tracker': 'from-purple-900/40 to-slate-800',
};

export const Projects = () => {
  const sectionRef = useRef(null);

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

    const currentCards = sectionRef.current?.querySelectorAll('[data-card]');
    currentCards?.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-40 px-6 md:px-20 relative overflow-hidden"
    >
      {/* Elemen dekoratif pendaran cahaya (glow orbs) di background */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full max-w-4xl h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Bagian Judul Section Proyek */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-20 md:mb-28">
          <div className="relative">
            <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase mb-3 flex items-center gap-4">
              <span className="w-12 h-px bg-cyan-400/50 block"></span>
              Karya Terpilih
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Beberapa sorotan dari karya terbaru.
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed lg:text-right">
            Setiap proyek dibangun agar terasa tajam, ekspresif, dan mudah dinavigasi di semua ukuran layar.
          </p>
        </div>

        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
              <div
                key={project.id}
                data-card
                id={`project-${project.id}`}
                className="w-full"
                style={{ opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              >
                {/* Bagian dalem kartu: nanganin efek hover murni pake class CSS Tailwind */}
                <div className="group relative h-full rounded-[2rem] border border-white/5 bg-[#0a0f24] overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_-15px_rgba(34,211,238,0.15)] hover:border-cyan-500/30 flex flex-col">
                  
                  {/* Efek pendaran cahaya halus di dalem kartu pas di-hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.1),transparent_70%)]" />

                  {/* Bagian Gambar Sampul Proyek */}
                  <div className={`h-56 bg-gradient-to-br ${gradients[project.id]} relative overflow-hidden group-hover:after:absolute group-hover:after:inset-0 group-hover:after:bg-black/10`}>
                    {project.image ? (
                      <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover opacity-70 mix-blend-overlay group-hover:mix-blend-normal group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700" />
                    ) : (
                      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
                    )}
                  </div>

                  {/* Wadah Konten: Judul, Deskripsi, Tech Tags, dan Tombol Demo/Code */}
                  <div className="p-8 flex flex-col flex-1 relative z-10">
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-400 transition-colors duration-300">{project.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[11px] font-medium text-cyan-100/60 border border-cyan-500/10 rounded-full bg-cyan-500/5 group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300 w-12"
                        aria-label="GitHub Repository"
                      >
                        <GitHubIcon />
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-transparent border border-cyan-500/30 text-cyan-400 text-sm font-semibold hover:bg-cyan-500 hover:text-slate-900 transition-all duration-300"
                      >
                        <ExternalIcon />
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};
