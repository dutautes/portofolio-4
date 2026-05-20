import { motion } from 'framer-motion';
import { ExternalLink, Award, Calendar } from 'lucide-react';

export const JourneyNode = ({ data, index, isLeft }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative w-full flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-center mb-16 md:mb-24 group`}
    >
      {/* Node connecting point to center line (Desktop only) */}
      <div className={`absolute top-1/2 -translate-y-1/2 w-[calc(5%-1rem)] h-px bg-cyan-500/30 hidden md:block ${isLeft ? 'right-[45%]' : 'left-[45%]'}`} />
      
      {/* Center dot (Desktop only) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] z-10 hidden md:block" />

      <div
        className="relative w-full md:w-[45%] rounded-2xl p-[1px] overflow-hidden bg-white/5 border border-white/10 transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] z-10 group-hover:z-20 md:group-hover:scale-[1.02]"
      >
        {/* Static Glow Effect on hover instead of mouse tracking */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 hidden md:block bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_70%)]"
        />

        <div className="relative h-full w-full bg-[#020617] rounded-2xl p-6 md:p-8 flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <span className="text-cyan-400 text-sm font-mono flex items-center gap-2">
              <Calendar className="w-4 h-4" /> {data.issue_date}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {data.title}
            </h3>
            {data.credential_id && (
              <p className="text-slate-400 text-sm md:text-base flex items-center gap-2 mt-1">
                <Award className="w-4 h-4 text-purple-400" /> {data.credential_id}
              </p>
            )}
          </div>

          <div 
            className="w-full aspect-[4/3] rounded-xl overflow-hidden relative border border-white/5 mt-2"
          >
            {data.image_url ? (
              <img 
                src={data.image_url} 
                alt={data.title} 
                loading="lazy"
                className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full bg-slate-800/50 flex flex-col items-center justify-center text-slate-500">
                <Award className="w-12 h-12 mb-2 opacity-50" />
                <span className="text-sm">Certificate Image</span>
              </div>
            )}
            
            {/* Holographic Overlay on Image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-cyan-400/10 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          </div>

          {data.credential_url && (
            <div className="mt-auto pt-2">
              <a 
                href={data.credential_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Credential <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};
