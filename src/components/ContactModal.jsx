import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Send, CheckCircle2 } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa6';
import { SiGithub, SiLeetcode, SiWhatsapp } from 'react-icons/si';
import confetti from 'canvas-confetti';
import Particles from './Particles';

export default function ContactModal({ isOpen, onClose }) {
  const [view, setView] = useState('cloud'); // 'cloud' | 'form'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [activeTagIndex, setActiveTagIndex] = useState(0);

  // Generate randomized scattered positions for user's profiles on modal open
  const generateRandomPositions = () => [
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/priyanshumahato/',
      icon: <FaLinkedin className="w-4 h-4 text-[#0A66C2]" />,
      pos: { x: -115 + Math.floor(Math.random() * 26) - 13, y: -38 + Math.floor(Math.random() * 20) - 10 },
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/pKm720',
      icon: <SiGithub className="w-4 h-4 text-gray-900 dark:text-white" />,
      pos: { x: 38 + Math.floor(Math.random() * 26) - 13, y: -48 + Math.floor(Math.random() * 20) - 10 },
    },
    {
      id: 'leetcode',
      label: 'LeetCode',
      href: 'https://leetcode.com/u/Priyanshu_km/',
      icon: <SiLeetcode className="w-4 h-4 text-[#FFA116]" />,
      pos: { x: 42 + Math.floor(Math.random() * 26) - 13, y: 38 + Math.floor(Math.random() * 20) - 10 },
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: 'https://wa.me/919749616578?text=Hi%20Priyanshu,%20I%27d%20like%20to%20collaborate!',
      icon: <SiWhatsapp className="w-4 h-4 text-[#25D366]" />,
      pos: { x: -88 + Math.floor(Math.random() * 26) - 13, y: 46 + Math.floor(Math.random() * 20) - 10 },
    },
  ];

  const [tagItems, setTagItems] = useState(generateRandomPositions);

  // Randomize positions whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setTagItems(generateRandomPositions());
      setActiveTagIndex(0);
    }
  }, [isOpen]);

  // Automatically cycle through elements smoothly
  useEffect(() => {
    if (!isOpen || view !== 'cloud') return;
    const interval = setInterval(() => {
      setActiveTagIndex((prev) => (prev + 1) % tagItems.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [isOpen, view, tagItems.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d00', '#ffa700', '#ffffff'],
    });

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
      setView('cloud');
      onClose();
    }, 2800);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-8">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md"
        />

        {/* Modal Capsule Window */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          className="relative z-10 w-full max-w-4xl rounded-[40px] sm:rounded-[60px] md:rounded-[100px] bg-[#fffdf8] dark:bg-[#141414] border border-black/10 dark:border-white/15 text-gray-900 dark:text-white shadow-2xl p-6 sm:p-10 md:p-12 overflow-hidden"
        >
          {/* Particles Ambient Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] z-0 opacity-75 dark:opacity-90">
            <Particles
              particleCount={180}
              particleSpread={12}
              speed={0.12}
              particleColors={["#ff4d00", "#ff6b2b", "#ffa040", "#ff3300", "#ff8844"]}
              moveParticlesOnHover={false}
              particleHoverFactor={1}
              alphaParticles={true}
              particleBaseSize={85}
              sizeRandomness={1}
              cameraDistance={20}
              disableRotation={false}
            />
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-6 right-6 sm:top-8 sm:right-8 w-9 h-9 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-gray-700 dark:text-gray-300 flex items-center justify-center transition-colors z-30"
          >
            <X className="w-4 h-4" />
          </button>

          {/* VIEW 1: 2-Column Capsule Layout */}
          {view === 'cloud' && (
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 relative z-10">
              {/* Left Column: Randomized Clickable Profile Tags with Cycling Cursor */}
              <div className="relative w-full h-56 sm:h-64 flex items-center justify-center select-none overflow-hidden">
                {/* Randomized Clickable Profile Tags */}
                {tagItems.map((tag, idx) => {
                  const isActive = idx === activeTagIndex;
                  return (
                    <motion.a
                      key={tag.id}
                      href={tag.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      animate={{
                        x: tag.pos.x,
                        y: tag.pos.y,
                        scale: isActive ? 1.06 : 1,
                      }}
                      whileHover={{ scale: 1.12 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className={`absolute px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm backdrop-blur-md transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-white dark:bg-white/25 border border-[#ff4d00]/70 text-gray-950 dark:text-white shadow-md ring-2 ring-[#ff4d00]/30'
                          : 'bg-white/70 dark:bg-white/10 border border-black/15 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:border-[#ff4d00] hover:text-[#ff4d00]'
                      }`}
                    >
                      <span className="text-sm">{tag.icon}</span>
                      <span>{tag.label}</span>
                    </motion.a>
                  );
                })}

                {/* Ultra-Accurate Mouse Pointer Arrow & "You" Badge */}
                <motion.div
                  animate={{
                    x: (tagItems[activeTagIndex]?.pos?.x ?? 0) + 12,
                    y: (tagItems[activeTagIndex]?.pos?.y ?? 0) + 14,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 90,
                    damping: 16,
                    mass: 0.8,
                  }}
                  className="absolute pointer-events-none z-20"
                >
                  <div className="relative -top-0.5 -left-0.5 flex flex-col items-start">
                    {/* Real Cursor Arrow with tip at (0, 0) */}
                    <svg
                      className="w-4 h-4 text-[#ff4d00] drop-shadow-md"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 0 L6 19 L10 12.5 L17.5 15.5 L19 12 L11.5 9 L18 6 Z" />
                    </svg>
                    {/* "You" Badge */}
                    <span className="mt-0.5 ml-2 px-2 py-0.5 rounded-full bg-[#ff4d00] text-white text-[9px] font-bold shadow-md select-none leading-none whitespace-nowrap">
                      You
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Narrative & Action Buttons */}
              <div className="flex flex-col items-start text-left">
                <h3 className="text-2xl sm:text-3xl md:text-[34px] font-extrabold font-Whyte tracking-tight text-gray-900 dark:text-white leading-tight">
                  Hire me to bring your ideas to life!
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 font-Ovo mt-2 mb-6">
                  Feel free to reach out!
                </p>

                {/* Single Email Me Action Button */}
                <a
                  href="mailto:priyanshumahato0210@gmail.com"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white font-bold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 group select-none"
                  title="Send email to priyanshumahato0210@gmail.com"
                >
                  <Mail className="w-4 h-4 text-[#ff4d00] group-hover:text-white transition-colors" />
                  <span>Email Me</span>
                </a>
              </div>
            </div>
          )}

          {/* VIEW 2: Form View */}
          {view === 'form' && (
            <div className="max-w-xl mx-auto py-2">
              <div className="text-center mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold font-Whyte text-gray-900 dark:text-white">
                  Let's Talk Tech
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-Ovo mt-1">
                  Ready to build something amazing? Fill out the form below.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3 animate-bounce" />
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Inquiry Received!</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thanks for reaching out. I'll get back to you within 24 hours!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff4d00] transition-colors"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Enter your email or phone"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff4d00] transition-colors"
                    />
                  </div>

                  <textarea
                    rows={3}
                    required
                    placeholder="Got a cool idea? Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#ff4d00] transition-colors resize-none"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setView('cloud')}
                      className="text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white font-bold text-sm flex items-center gap-2 transition-all duration-300 shadow-md"
                    >
                      <span>Submit Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
