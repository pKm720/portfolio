import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Trophy,
  Award,
  BookOpen,
  Code2,
  GitPullRequest,
  ChevronsUpDown,
  ChevronsDownUp,
  ExternalLink,
} from 'lucide-react';

export default function Experience() {
  const [expandedItem, setExpandedItem] = useState('edu-1');

  const toggleAccordion = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <section id="experience" className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[12%] py-16 md:py-24 scroll-mt-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="font-Ovo text-[#ff4d00] tracking-widest uppercase text-xs sm:text-sm font-bold">
          Academic Background & Milestones
        </p>
        <h2 className="font-Whyte text-4xl sm:text-5xl md:text-6xl font-extrabold mt-2 tracking-tight text-gray-900 dark:text-white">
          Education & Achievements
        </h2>
      </motion.div>

      {/* Main Experience Timeline Box */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto rounded-3xl border border-black/10 dark:border-white/10 bg-[#fffcf3]/50 dark:bg-[#121212]/50 p-6 sm:p-10 shadow-sm backdrop-blur-sm"
      >
        {/* Category 1: Education */}
        <div className="space-y-6 pb-8 border-b border-black/10 dark:border-white/10">
          {/* Category Title + Beacon */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-[#ff4d00]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold font-Whyte text-[#ff4d00]">
              Education
            </h3>
            {/* Live pulsing current status */}
            <span className="relative flex items-center justify-center ml-1">
              <span className="absolute inline-flex w-3.5 h-3.5 animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
              <span className="sr-only">Currently Enrolled</span>
            </span>
          </div>

          {/* Education Entries */}
          <div className="relative space-y-6 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 ml-3">
            {/* Degree 1: Dayananda Sagar College of Engineering */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleAccordion('edu-1')}
                className="w-full text-left group focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#ff4d00] transition-colors">
                      <BookOpen className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors">
                        Dayananda Sagar College of Engineering, Bangalore
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-Ovo">
                        B.E. in Information Science and Engineering • <span className="text-[#ff4d00] font-bold">CGPA: 8.34 / 10</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#ff4d00] transition-colors flex-shrink-0">
                    {expandedItem === 'edu-1' ? (
                      <ChevronsDownUp className="w-4 h-4" />
                    ) : (
                      <ChevronsUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-10 text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                  <span>Bengaluru, India</span>
                  <span>•</span>
                  <span>2023 — Present</span>
                </div>
              </button>

              {/* Accordion Content */}
              <AnimatePresence>
                {expandedItem === 'edu-1' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10 pt-3"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo mb-3">
                      Focusing on distributed computing, systems architecture, object-oriented programming, operating systems, and database transaction management. Active participant in collegiate technical hackathons and competitive programming.
                    </p>
                    {/* Coursework Pills */}
                    <div className="flex flex-wrap gap-2">
                      {['Data Structures & Algorithms', 'System Design', 'Operating Systems', 'DBMS & SQL', 'Computer Networks', 'OOP'].map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-0.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-[11px] font-mono text-gray-700 dark:text-gray-300 font-medium"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* School 2: Delhi Public School, Siliguri */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleAccordion('edu-2')}
                className="w-full text-left group focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#ff4d00] transition-colors">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors">
                        Delhi Public School, Siliguri
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 font-Ovo">
                        Secondary & Senior Secondary (CBSE) • <span className="text-[#ff4d00] font-bold">88.8% | 83%</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#ff4d00] transition-colors flex-shrink-0">
                    {expandedItem === 'edu-2' ? (
                      <ChevronsDownUp className="w-4 h-4" />
                    ) : (
                      <ChevronsUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-10 text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">
                  <span>Siliguri, West Bengal</span>
                  <span>•</span>
                  <span>2019 — 2022</span>
                </div>
              </button>

              <AnimatePresence>
                {expandedItem === 'edu-2' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10 pt-3"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo">
                      Completed Higher Secondary with a strong foundation in Mathematics, Physics, and Computer Science fundamentals.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Category 2: Achievements & Honors */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center text-[#ff4d00]">
              <Trophy className="w-4 h-4" />
            </div>
            <h3 className="text-xl font-bold font-Whyte text-[#ff4d00]">
              Achievements & Open Source
            </h3>
          </div>

          <div className="relative space-y-6 pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 ml-3">
            {/* Achievement 1: Smart India Hackathon 2025 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleAccordion('ach-1')}
                className="w-full text-left group focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#ff4d00] transition-colors">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors">
                        Winner (Internal Round) — Smart India Hackathon 2025
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
                        Selected from 200+ competing engineering teams
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#ff4d00] transition-colors flex-shrink-0">
                    {expandedItem === 'ach-1' ? (
                      <ChevronsDownUp className="w-4 h-4" />
                    ) : (
                      <ChevronsUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedItem === 'ach-1' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10 pt-3"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo">
                      Secured first place in the internal selection round for SIH 2025 at Dayananda Sagar College of Engineering, presenting an innovative software engineering solution evaluated against over 200 college-wide teams.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Achievement 2: LeetCode & DSA */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleAccordion('ach-2')}
                className="w-full text-left group focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#ff4d00] transition-colors">
                      <Code2 className="w-3.5 h-3.5 text-[#ff4d00]" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors">
                        100+ Data Structures & Algorithms Solved
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
                        LeetCode & GeeksforGeeks
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#ff4d00] transition-colors flex-shrink-0">
                    {expandedItem === 'ach-2' ? (
                      <ChevronsDownUp className="w-4 h-4" />
                    ) : (
                      <ChevronsUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedItem === 'ach-2' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10 pt-3"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo mb-2">
                      Consistently sharpening problem-solving skills across arrays, dynamic programming, trees, graph algorithms, and system optimization.
                    </p>
                    <a
                      href="https://leetcode.com/u/Priyanshu_km/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#ff4d00] font-mono hover:underline"
                    >
                      <span>View LeetCode Profile</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Achievement 3: Hacktoberfest 2025 */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleAccordion('ach-3')}
                className="w-full text-left group focus:outline-none"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 group-hover:border-[#ff4d00] transition-colors">
                      <GitPullRequest className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-[#ff4d00] transition-colors">
                        Hacktoberfest 2025 Contributor
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
                        7+ Merged Open Source Pull Requests
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-400 group-hover:text-[#ff4d00] transition-colors flex-shrink-0">
                    {expandedItem === 'ach-3' ? (
                      <ChevronsDownUp className="w-4 h-4" />
                    ) : (
                      <ChevronsUpDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {expandedItem === 'ach-3' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden pl-10 pt-3"
                  >
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-Ovo mb-2">
                      Contributed 7+ merged pull requests across open-source repositories, collaborating with global maintainers on developer tooling, API enhancements, and bug fixes.
                    </p>
                    <a
                      href="https://github.com/pKm720"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#ff4d00] font-mono hover:underline"
                    >
                      <span>View GitHub Contributions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
