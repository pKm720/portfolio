import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool } from 'lucide-react';

export default function ContactCTA({ onOpenContact }) {
  return (
    <section id="contact" className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[12%] py-20 md:py-28 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center"
      >
        {/* Stylized Animated Pen / Quill Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-6 flex items-center justify-center relative">
          <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-[#ff4d00]/15 to-amber-400/20 dark:from-[#ff4d00]/25 dark:to-amber-400/25 flex items-center justify-center text-[#ff4d00] shadow-lg border border-[#ff4d00]/30 animate-bounce">
            <PenTool className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 transform -rotate-12" />
          </div>
          <div className="absolute -bottom-2 w-12 h-1 bg-[#ff4d00] rounded-full opacity-70 blur-[1px]" />
        </div>

        {/* Large Typography */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px] font-extrabold font-Ovo uppercase tracking-tighter leading-[0.95] text-gray-900 dark:text-white">
          INTERESTED IN
        </h2>
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[85px] font-extrabold font-Ovo uppercase tracking-tighter leading-[0.95] text-gray-900 dark:text-white mt-1 sm:mt-2">
          WORKING <span className="text-[#ff4d00]">TOGETHER?</span>
        </h2>

        {/* Animated Get in Touch Button */}
        <div className="mt-10 sm:mt-14">
          <button
            onClick={onOpenContact}
            className="group relative overflow-hidden rounded-full border border-black/20 dark:border-white/30 bg-[#fffcf3] dark:bg-[#121212] px-8 py-4 font-bold text-base sm:text-lg text-black dark:text-white shadow-lg hover:shadow-2xl transition-all duration-500 flex items-center justify-center min-w-[200px] h-[54px]"
          >
            {/* Animated Expanding Dark Circle on Hover */}
            <div className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black dark:bg-[#fffcf3] transition-all duration-500 scale-0 group-hover:scale-[30] pointer-events-none" />

            {/* Default State Content */}
            <div className="relative z-10 flex items-center gap-3 transition-all duration-300 group-hover:-translate-x-12 group-hover:opacity-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00]" />
              <span>Get in Touch</span>
            </div>

            {/* Hover State Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center gap-2 text-white dark:text-black font-bold transition-all duration-300 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              <span>Get in Touch</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
