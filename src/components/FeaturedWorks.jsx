import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

export default function FeaturedWorks({ onOpenProject }) {
  const projects = [
    {
      id: 'edgemesh',
      title: 'EdgeMesh — Distributed CDN',
      subtitle: 'MICROSERVICES & DISTRIBUTED CACHING',
      year: '2026',
      tags: ['NODE.JS', 'DOCKER', 'REDIS', 'POSTGRESQL'],
      github: 'https://github.com/pKm720/MiniCDN',
      accentGlow: 'from-[#ff4d00]/10 via-transparent to-transparent',
      description:
        'Engineered a microservices-based distributed CDN simulation with an Origin server, Load Balancer, and 3 Docker Edge nodes. Implemented multi-layer caching (LRU, TTL), proactive replication (~31% latency reduction on cache hits), and heartbeat-based automatic failover.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
      offsetClass: '',
    },
    {
      id: 'clearpath',
      title: 'ClearPath — AI Health Navigation',
      subtitle: 'GEOSPATIAL AI & A* PATHFINDING',
      year: '2026',
      tags: ['FASTAPI', 'XGBOOST', 'MAPLIBRE', 'A* SEARCH'],
      github: 'https://github.com/pKm720/Clear_Path',
      accentGlow: 'from-emerald-500/10 via-transparent to-transparent',
      description:
        'Pollution-aware navigation over a 221K+ node OpenStreetMap road graph using A* pathfinding (Cleanest, Balanced, Fastest). Trained XGBoost virtual sensor models on 221K+ AQI records (R²=0.96) with GPU-accelerated heatmaps in MapLibre GL JS.',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=80',
      offsetClass: 'md:translate-y-10 xl:translate-y-14',
    },
    {
      id: 'backend-ledger',
      title: 'Backend Ledger — Banking API',
      subtitle: 'FINANCIAL SYSTEM & CONCURRENCY',
      year: '2026',
      tags: ['EXPRESS', 'POSTGRESQL', 'KNEX.JS', 'ZOD'],
      github: 'https://github.com/pKm720/Banking-Backend-Ledger',
      accentGlow: 'from-amber-500/10 via-transparent to-transparent',
      description:
        'Designed ACID-compliant financial transfers with concurrency control, using Knex.js and PostgreSQL transactions to atomically execute double-entry debit/credit ledger operations. Enforced append-only immutability through PL/pgSQL triggers and token blacklisting.',
      image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
      offsetClass: '',
    },
  ];

  const handleMouseMove = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section id="work" className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[8%] py-16 md:py-24 scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="font-Ovo text-[#ff4d00] tracking-widest uppercase text-xs sm:text-sm font-bold mb-2">
          Projects & Codebases
        </p>
        <h2 className="font-Whyte text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Featured Works
        </h2>
        <div className="max-w-2xl mx-auto mt-4 text-sm sm:text-base font-Ovo text-gray-600 dark:text-gray-300">
          Featured software engineering projects spanning{' '}
          <span className="font-bold text-gray-900 dark:text-white underline decoration-[#ff4d00] underline-offset-4">
            Distributed Systems
          </span>
          ,{' '}
          <span className="font-bold text-gray-900 dark:text-white underline decoration-[#ff4d00] underline-offset-4">
            AI-Driven Geospatial Routing
          </span>
          , and{' '}
          <span className="font-bold text-gray-900 dark:text-white underline decoration-[#ff4d00] underline-offset-4">
            ACID Transactional Backends
          </span>
          .
        </div>
      </motion.div>

      {/* 3 Hanging Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10 lg:gap-12 pt-16 max-w-7xl mx-auto pb-16">
        {projects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className={`relative group ${proj.offsetClass}`}
          >
            {/* Top Hanging Wire & Pin Dot */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1.5px] h-12 bg-gray-300 dark:bg-gray-700 -z-10 group-hover:h-16 transition-all duration-500">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-gray-400 dark:bg-gray-600 rounded-full border-2 border-[#fffcf3] dark:border-[#0a0a0a]" />
            </div>

            {/* Main Rounded Card Container - Styled to match site theme */}
            <div className="rounded-[2.5rem] overflow-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-500 relative z-10 h-full transform group-hover:-translate-y-2 bg-[#fffcf3] dark:bg-[#141414] border border-black/10 dark:border-white/10 group-hover:border-[#ff4d00]/50 dark:group-hover:border-[#ff4d00]/50">
              {/* Subtle top ambient glow */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${proj.accentGlow} pointer-events-none`} />

              <div className="p-8 sm:p-10 pb-6 flex flex-col h-full relative z-10">
                {/* Top Row: GitHub Button + Year Badge */}
                <div className="flex justify-between items-center mb-6">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 hover:bg-[#ff4d00] hover:text-white hover:border-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white dark:hover:border-[#ff4d00] flex items-center justify-center text-gray-800 dark:text-gray-200 transition-all duration-200 shadow-sm"
                    title="View Source on GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <div className="border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/[0.03] text-gray-800 dark:text-gray-200 rounded-full px-4 py-0.5 text-xs font-bold tracking-tight font-mono">
                    {proj.year}
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight font-Whyte tracking-tight text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors mb-1.5 break-words">
                  {proj.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] font-black tracking-[0.2em] uppercase mb-4 font-mono text-[#ff4d00]">
                  {proj.subtitle}
                </p>

                {/* Description Snippet */}
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-Ovo leading-relaxed line-clamp-3 mb-6">
                  {proj.description}
                </p>

                {/* Card Visual Mockup Area */}
                <div className="mt-auto relative aspect-[16/10] rounded-[1.8rem] overflow-hidden group-hover:scale-[1.02] transition-transform duration-500 ease-out bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 shadow-inner">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  />

                  {/* Floating Tags Bottom Right */}
                  <div className="absolute bottom-3 right-3 flex flex-wrap gap-1.5 justify-end max-w-[85%]">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#fffcf3]/90 dark:bg-[#181818]/90 backdrop-blur-md text-gray-800 dark:text-gray-200 text-[8px] sm:text-[9px] font-mono font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wider uppercase border border-black/10 dark:border-white/15 group-hover:border-[#ff4d00]/50 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More / Journey Button */}
      <div className="flex justify-center mt-8 md:mt-16">
        <a
          href="#experience"
          className="group flex items-center justify-center gap-2 border border-gray-800 dark:border-white/40 text-gray-800 dark:text-white rounded-full py-3.5 px-10 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] dark:hover:bg-white dark:hover:text-black transition-all duration-300 text-sm sm:text-base font-bold shadow-sm"
        >
          <span>View Education & Achievements</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
