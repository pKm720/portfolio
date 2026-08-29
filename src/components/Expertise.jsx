import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Cpu, Navigation, SquareArrowOutUpRight } from 'lucide-react';

export default function Expertise({ onOpenContact }) {
  const services = [
    {
      id: 'distributed-systems',
      title: 'Distributed Systems & Caching',
      description:
        'Architecting resilient distributed microservices, Docker container networking, multi-layer caching (LRU eviction & TTL), proactive replication, and heartbeat-based load balancer failover.',
      icon: Network,
      span: 'md:col-span-6 xl:col-span-6',
    },
    {
      id: 'backend-api',
      title: 'Backend & Transactional APIs',
      description:
        'Designing high-integrity RESTful APIs with Node.js, Express, and FastAPI. Specializing in ACID-compliant PostgreSQL transactions, Knex.js, PL/pgSQL triggers, JWT auth, and Zod schema validation.',
      icon: Database,
      span: 'md:col-span-6 xl:col-span-6',
    },
    {
      id: 'fullstack-dev',
      title: 'Full-Stack & Frontend Systems',
      description:
        'Building dynamic, responsive interfaces with React.js, Tailwind CSS, Zustand, and React Flow, paired with scalable Node.js/FastAPI backends, BullMQ queues, and WebSockets.',
      icon: Cpu,
      span: 'md:col-span-6 xl:col-span-6',
    },
    {
      id: 'ai-geospatial',
      title: 'AI & Geospatial Intelligence',
      description:
        'Training Machine Learning models (XGBoost) on large-scale datasets, implementing A* pathfinding algorithms over 221K+ node OpenStreetMap graphs, and rendering GPU heatmaps with MapLibre GL JS.',
      icon: Navigation,
      span: 'md:col-span-6 xl:col-span-6',
    },
  ];

  return (
    <section id="services" className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[8%] py-16 md:py-24 scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <span className="font-Ovo text-[#ff4d00] tracking-widest uppercase text-xs sm:text-sm font-bold">
          Core Domains
        </span>
        <h2 className="font-Whyte text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2 tracking-tight text-gray-900 dark:text-white">
          Technical Expertise
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${service.span} group relative rounded-3xl p-[1px] bg-gradient-to-b from-black/10 via-black/5 to-transparent dark:from-white/15 dark:via-white/5 dark:to-transparent hover:from-[#ff4d00]/40 hover:via-[#ff4d00]/15 hover:to-transparent transition-all duration-500`}
            >
              {/* Inner card surface */}
              <div className="relative h-full rounded-[23px] bg-[#fffcf3] dark:bg-[#121212] p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-xl dark:shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-all duration-300">
                {/* Top Row: Icon */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-[#ff4d00] group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Content: Title + Description */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-Whyte text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors mb-3">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-Ovo">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
