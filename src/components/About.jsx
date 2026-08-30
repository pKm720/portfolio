import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Code2, FileText, ArrowUpRight, Sparkles } from 'lucide-react';

export default function About() {
  const resumeUrl = 'https://drive.google.com/file/d/1GFaBDM0Gf5bhm1Kmly4gK1miLBPFIm4L/view?usp=sharing';

  return (
    <section id="about" className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[12%] pt-6 sm:pt-12 md:pt-16 pb-12 sm:pb-16 md:pb-24 scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-16 flex flex-col items-center text-center"
      >
        <span className="font-Ovo text-[#ff4d00] tracking-widest uppercase text-xs sm:text-sm font-bold">
          Summary & Background
        </span>
        <h2 className="font-Whyte text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2 tracking-tight text-gray-900 dark:text-white">
          About Me
        </h2>
      </motion.div>

      {/* Main Rich Narrative Text from Resume */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-5xl mx-auto"
      >
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-medium leading-relaxed md:leading-snug text-gray-800 dark:text-gray-100 text-center tracking-tight">
          Hi, <span className="text-[#ff4d00] font-bold">I am</span>{' '}
          {/* Inline avatar image */}
          <span className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-tr from-[#ff4d00] to-amber-400 p-0.5 align-middle mx-1 shadow-md rotate-3 hover:rotate-0 transition-transform cursor-pointer overflow-hidden">
            <img
              src="/priyanshu.jpg"
              alt="Priyanshu Kumar Mahato"
              className="w-full h-full object-cover rounded-[14px]"
            />
          </span>{' '}
          <span className="text-[#ff4d00] font-bold font-Array">Priyanshu Kr. Mahato</span>, a{' '}
          <span className="text-gray-900 dark:text-white font-bold underline decoration-[#ff4d00] underline-offset-4">
            Software Engineering Student
          </span>{' '}
          focused on{' '}
          {/* Backend Heavy Icon */}
          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-black/5 dark:bg-white/10 p-2 mx-1 align-middle text-[#ff4d00] hover:scale-110 transition-transform">
            <Server className="w-full h-full" />
          </span>{' '}
          <strong className="font-bold text-gray-900 dark:text-white">backend-heavy full-stack development</strong>,{' '}
          {/* Distributed systems Icon */}
          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-black/5 dark:bg-white/10 p-2 mx-1 align-middle text-cyan-500 hover:scale-110 transition-transform">
            <Cpu className="w-full h-full" />
          </span>{' '}
          <strong className="font-bold text-gray-900 dark:text-white">distributed systems</strong>, and{' '}
          {/* REST API Icon */}
          <span className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl bg-black/5 dark:bg-white/10 p-2 mx-1 align-middle text-emerald-500 hover:scale-110 transition-transform">
            <Code2 className="w-full h-full" />
          </span>{' '}
          <strong className="font-bold text-gray-900 dark:text-white">RESTful API design</strong>.
        </h3>

        {/* Education & Core Focus Card - Solid Opaque */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-[#fffcf3] dark:bg-[#121212] border border-black/10 dark:border-white/10 shadow-sm text-center max-w-4xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 font-Ovo leading-relaxed">
            Hands-on experience in <span className="text-[#ff4d00] font-semibold">System Design</span>,{' '}
            <span className="text-[#ff4d00] font-semibold">Microservices Architecture</span>,{' '}
            <span className="text-[#ff4d00] font-semibold">Caching Strategies (LRU/TTL)</span>, and{' '}
            <span className="text-[#ff4d00] font-semibold">Database Transaction Integrity (ACID)</span>. Currently pursuing B.E. in Information Science & Engineering at <strong>Dayananda Sagar College of Engineering, Bangalore</strong> (CGPA: 8.34/10).
          </p>
        </div>

        {/* Resume Action Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-Whyte font-bold text-sm sm:text-base bg-[#1a1a1a] dark:bg-[#fffcf3] text-white dark:text-black hover:bg-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4 text-[#ff4d00] group-hover:text-white dark:text-[#ff4d00] dark:group-hover:text-white transition-colors" />
            <span>View Full Resume (PDF)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
