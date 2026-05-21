import { motion } from 'framer-motion';
import { useState } from 'react';
import { achievements } from '../data/portfolioData';
import { JourneyNode } from './JourneyNode';
import { ChevronDown } from 'lucide-react';

export const JourneyVault = () => {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, achievements.length));
  };

  return (
    <section id="journey" className="relative py-32 overflow-hidden bg-[#020617]">
      {/* Latar belakang halaman & Tulisan teks besar samar (watermark) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <h2 className="text-[10rem] md:text-[20rem] font-black text-white/[0.02] tracking-tighter whitespace-nowrap rotate-90 md:rotate-0 select-none">
          LEVELING UP
        </h2>
        
        {/* Bola pendaran cahaya (glow orbs) ungu dan cyan di latar belakang */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Perjalanan & Sertifikasi
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl"
          >
            Sebuah arsip pencapaian dan pembelajaran sepanjang perjalanan sebagai developer.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto pb-10">
          {/* Garis linimasa vertikal tengah (tampil di desktop) */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent hidden md:block" />

          {/* Garis linimasa vertikal kiri (tampil di layar hp/mobile) */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent md:hidden block" />

          <div className="flex flex-col relative w-full pt-10">
            {achievements.slice(0, visibleCount).map((item, index) => (
              <JourneyNode
                key={item.id}
                data={item}
                index={index}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
          
          {/* Tombol buat nampilin sertifikat berikutnya (Load More) */}
          {visibleCount < achievements.length && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center mt-8 relative z-20"
            >
              <button
                onClick={handleLoadMore}
                className="group relative px-8 py-3.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] text-white font-medium transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Lihat Lebih Banyak
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                {/* Efek kilatan cahaya menyapu (glow sweep) pas tombol di-hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
};
