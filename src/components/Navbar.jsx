import React, { useState, useEffect } from 'react';
import { Sun, Moon, ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenContact }) {
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const themeBtnRef = React.useRef(null);

  useEffect(() => {
    // Check initial theme
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = (e) => {
    const nextDark = !isDark;

    // Get exact button center coordinates from DOM element directly
    const btn = document.getElementById('theme-toggle-button') || themeBtnRef.current || e?.currentTarget;
    const rect = btn?.getBoundingClientRect?.();
    const x = rect ? Math.round(rect.left + rect.width / 2) : Math.round(e?.clientX ?? (window.innerWidth - 60));
    const y = rect ? Math.round(rect.top + rect.height / 2) : Math.round(e?.clientY ?? 40);

    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    );

    if (document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const transition = document.startViewTransition(() => {
        if (nextDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          setIsDark(false);
        }
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 650,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
    } else {
      if (nextDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      }
    }
  };

  const navItems = [
    { label: 'Home', number: '01', href: '#top' },
    { label: 'About', number: '02', href: '#about' },
    { label: 'Expertise', number: '03', href: '#services' },
    { label: 'Projects', number: '04', href: '#work' },
    { label: 'Education', number: '05', href: '#experience' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full fixed top-0 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[8%] flex items-center justify-between z-[100] transition-all duration-300 ${scrolled ? 'py-2 sm:py-3 bg-[#fffcf3]/85 dark:bg-[#0a0a0a]/85 backdrop-blur-md shadow-sm border-b border-black/5 dark:border-white/5' : 'py-3 sm:py-4 md:py-6'
          }`}
      >
        {/* Brand Logo */}
        <a href="#top" className="group flex items-center gap-1.5 focus:outline-none">
          <div className="flex items-center">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-black dark:text-white transition-transform group-hover:scale-105">
              pKm
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] ml-0.5 inline-block group-hover:scale-125 transition-transform" />
          </div>
        </a>

        {/* Center Navigation Links (Desktop) */}
        <ul className="hidden min-[1100px]:flex items-center gap-1 xl:gap-2 rounded-full p-1.5 bg-[#fffcf3]/90 dark:bg-[#151515]/90 border border-black/10 dark:border-white/10 shadow-sm backdrop-blur-md">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="group relative inline-flex items-center justify-center px-4 xl:px-5 py-2 rounded-full text-sm font-semibold font-Whyte text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all hover:bg-black/5 dark:hover:bg-white/10"
              >
                <span className="relative block h-[18px] overflow-hidden">
                  {/* Default text */}
                  <span className="flex items-center h-full transition-transform duration-300 ease-out group-hover:-translate-y-full whitespace-nowrap">
                    {item.label}
                  </span>
                  {/* Hover duplicate text sliding up */}
                  <span className="absolute inset-0 flex items-center h-full text-[#ff4d00] font-bold transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0 whitespace-nowrap">
                    {item.label}
                  </span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 ml-1.5 font-mono leading-none group-hover:text-[#ff4d00] transition-colors">
                  {item.number}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Right Action Icons & Connect Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Dark / Light Toggle */}
          <button
            id="theme-toggle-button"
            ref={themeBtnRef}
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle theme"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-[#fffcf3]/80 dark:bg-[#181818]/80 text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 overflow-hidden shadow-sm"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDark ? 180 : 0, scale: [0.8, 1] }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-800" />
              )}
            </motion.div>
          </button>

          {/* Connect Button (Desktop) */}
          <div className="hidden min-[1200px]:block">
            <button
              onClick={onOpenContact}
              className="relative z-[3] overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 group font-Whyte font-bold px-8 py-3 h-12 text-sm sm:text-base bg-[#fffcf3] dark:bg-[#121212] hover:bg-[#fff7f0] dark:hover:bg-[#1c1c1c] border border-black/15 dark:border-white/20 rounded-full shadow-sm hover:shadow-md hover:border-[#ff4d00]/50"
            >
              {/* Subtle animated border gradient */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none p-[1px] bg-gradient-to-r from-[#ff4d00] via-[#ffaa00] to-[#ff4d00]" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />

              <span className="relative z-10 block overflow-hidden leading-[1.2]">
                <span className="flex items-center text-black dark:text-white font-bold transition-transform duration-300 ease-out group-hover:-translate-y-full">
                  Connect
                  <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <span className="absolute inset-0 flex items-center text-[#ff4d00] font-bold transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
                  Connect
                  <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1200px]:hidden flex h-10 w-10 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-[#fffcf3] dark:bg-[#181818] text-black dark:text-white shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Floating Bottom Menu for Mobile / Small Screens */}
      <div className="fixed bottom-6 right-6 z-[60] min-[1200px]:hidden flex flex-col items-end gap-3">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Open mobile menu"
          className="w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 bg-black dark:bg-[#fffcf3] text-white dark:text-black hover:bg-[#ff4d00] dark:hover:bg-[#ff4d00] dark:hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-[99] rounded-3xl bg-[#fffcf3]/95 dark:bg-[#121212]/95 backdrop-blur-xl border border-black/10 dark:border-white/15 p-6 shadow-2xl min-[1200px]:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2 text-lg font-bold border-b border-black/5 dark:border-white/5 text-gray-900 dark:text-white hover:text-[#ff4d00] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 font-mono">
                    {item.number}
                  </span>
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="mt-2 w-full py-3.5 rounded-full bg-[#ff4d00] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#ff4d00]/25 active:scale-98 transition-transform"
              >
                Connect With Me
                <ArrowUpRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
