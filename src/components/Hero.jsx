import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Download, ExternalLink } from 'lucide-react';
import DecryptedText from './DecryptedText';
import LogoLoop from './LogoLoop';
import backInBlackAudio from '../assets/back-in-black.mp3';
import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiFastapi,
  SiExpress,
  SiGit,
  SiPostman,
  SiSwagger,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

export default function Hero({ onOpenContact }) {
  const [toggleRole, setToggleRole] = useState(false); // false = ENGINEER, true = DEVELOPER
  const [isIronMan, setIsIronMan] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const audioRef = useRef(null);
  const fadeIntervalRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);
  const activeSourceRef = useRef(null);
  const gainNodeRef = useRef(null);

  const TARGET_VOLUME = 0.35; // Balanced, comfortable volume

  useEffect(() => {
    // 1. Preload audio buffer for instant & unlimited repeat playback
    const loadAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const response = await fetch(backInBlackAudio);
        const arrayBuffer = await response.arrayBuffer();
        const decodedBuffer = await ctx.decodeAudioData(arrayBuffer);
        audioBufferRef.current = decodedBuffer;
      } catch (e) {
        console.warn('WebAudio load fallback:', e);
      }
    };
    loadAudio();

    // 2. Global unlock on any early user interaction across the browser window
    const unlockAudioContext = () => {
      setIsUnlocked(true);
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume().catch(() => { });
      }
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.volume = 0;
        const p = audioRef.current.play();
        if (p !== undefined) {
          p.then(() => {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }).catch(() => { });
        }
      }
    };

    const unlockEvents = ['click', 'pointerdown', 'mousedown', 'touchstart', 'keydown'];
    unlockEvents.forEach((ev) => window.addEventListener(ev, unlockAudioContext, { passive: true }));

    return () => {
      unlockEvents.forEach((ev) => window.removeEventListener(ev, unlockAudioContext));
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => { });
      }
    };
  }, []);

  const playIronManAudio = () => {
    // Method 1: Web Audio API (Instant, repeatable 100% every hover with zero delay)
    if (audioContextRef.current && audioBufferRef.current) {
      try {
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        // Stop any currently playing instance cleanly
        if (activeSourceRef.current) {
          try {
            activeSourceRef.current.stop();
          } catch (e) { }
          activeSourceRef.current.disconnect();
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBufferRef.current;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(TARGET_VOLUME, ctx.currentTime + 0.35); // Smooth Phase-In

        source.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start(0);
        activeSourceRef.current = source;
        gainNodeRef.current = gainNode;
        return;
      } catch (e) {
        console.warn('WebAudio playback error, falling back to HTMLAudio:', e);
      }
    }

    // Method 2: HTMLAudioElement Fallback
    if (audioRef.current) {
      const audio = audioRef.current;
      audio.volume = 0;
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn('HTMLAudio play info:', err));
      }
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      let vol = 0;
      fadeIntervalRef.current = setInterval(() => {
        vol += 0.04;
        if (vol >= TARGET_VOLUME) {
          audio.volume = TARGET_VOLUME;
          clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = vol;
        }
      }, 30);
    }
  };

  const stopIronManAudio = () => {
    // Fade out Web Audio API
    if (audioContextRef.current && gainNodeRef.current) {
      try {
        const ctx = audioContextRef.current;
        const gainNode = gainNodeRef.current;
        gainNode.gain.cancelScheduledValues(ctx.currentTime);
        gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.35); // Smooth Phase-Out
        setTimeout(() => {
          if (activeSourceRef.current) {
            try {
              activeSourceRef.current.stop();
            } catch (e) { }
          }
        }, 360);
      } catch (e) { }
    }

    // Fade out HTMLAudio fallback
    if (audioRef.current) {
      const audio = audioRef.current;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      let vol = audio.volume;
      fadeIntervalRef.current = setInterval(() => {
        vol -= 0.04;
        if (vol <= 0.02) {
          audio.volume = 0;
          audio.pause();
          audio.currentTime = 0;
          clearInterval(fadeIntervalRef.current);
        } else {
          audio.volume = vol;
        }
      }, 30);
    }
  };

  const handleAvatarEnter = () => {
    if (!isUnlocked) return; // Locked on initial load until first click
    setIsIronMan(true);
    playIronManAudio();
  };

  const handleAvatarLeave = () => {
    if (!isUnlocked && !isIronMan) return;
    setIsIronMan(false);
    stopIronManAudio();
  };

  const handleAvatarClick = () => {
    if (!isUnlocked) {
      setIsUnlocked(true);
      setIsIronMan(true);
      playIronManAudio();
    } else {
      if (isIronMan) {
        setIsIronMan(false);
        stopIronManAudio();
      } else {
        setIsIronMan(true);
        playIronManAudio();
      }
    }
  };

  const techLogos = [
    { node: <SiReact />, title: 'React.js', color: '#61DAFB', href: 'https://react.dev' },
    { node: <SiNodedotjs />, title: 'Node.js', color: '#5FA04E', href: 'https://nodejs.org' },
    { node: <SiTypescript />, title: 'TypeScript', color: '#3178C6', href: 'https://www.typescriptlang.org' },
    { node: <SiPython />, title: 'Python', color: '#3776AB', href: 'https://www.python.org' },
    { node: <FaJava />, title: 'Java', color: '#E76F00', href: 'https://www.java.com' },
    { node: <SiDocker />, title: 'Docker', color: '#2496ED', href: 'https://www.docker.com' },
    { node: <SiPostgresql />, title: 'PostgreSQL', color: '#4169E1', href: 'https://www.postgresql.org' },
    { node: <SiRedis />, title: 'Redis', color: '#DC382D', href: 'https://redis.io' },
    { node: <SiMongodb />, title: 'MongoDB', color: '#47A248', href: 'https://www.mongodb.com' },
    { node: <SiTailwindcss />, title: 'Tailwind CSS', color: '#06B6D4', href: 'https://tailwindcss.com' },
    { node: <SiFastapi />, title: 'FastAPI', color: '#009688', href: 'https://fastapi.tiangolo.com' },
    { node: <SiExpress />, title: 'Express.js', color: '#999999', href: 'https://expressjs.com' },
    { node: <SiJavascript />, title: 'JavaScript', color: '#F7DF1E', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
    { node: <SiGit />, title: 'Git', color: '#F05032', href: 'https://git-scm.com' },
    { node: <SiPostman />, title: 'Postman', color: '#FF6C37', href: 'https://www.postman.com' },
    { node: <SiSwagger />, title: 'Swagger', color: '#85EA2D', href: 'https://swagger.io' },
  ];

  // Stable Interactive Name & Avatar Showcase Component (Picture Shifted Left)
  const renderNameAvatarShowcase = (extraClasses = '') => (
    <div className={`flex flex-col items-start select-none w-[265px] xs:w-[295px] sm:w-[325px] md:w-[350px] xl:w-[365px] ${extraClasses}`}>
      {/* Name Text (Fixed Container Width to Prevent Arrow Shift) */}
      <div className="flex flex-col z-10 w-full">
        <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-gray-100 font-Whyte">
          {isIronMan ? "And..." : 'Hi! I Am'}
        </span>
        <div className="relative h-8 sm:h-10 w-full flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            {!isIronMan ? (
              <motion.span
                key="priyanshu"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ff4d00] block whitespace-nowrap tracking-tight font-Whyte"
              >
                Priyanshu Kumar Mahato.
              </motion.span>
            ) : (
              <motion.span
                key="ironman"
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-[#e62429] via-[#ff9900] to-[#e62429] bg-clip-text text-transparent tracking-wide uppercase block whitespace-nowrap drop-shadow-md font-Whyte"
              >
                I am Iron Man.
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Connecting Dashed Curved Arrow + Avatar Layout (Balanced Position) */}
      <div className="relative w-full flex items-center justify-start gap-3 sm:gap-4 -mt-1 sm:-mt-2">
        {/* Reference Dashed Arrow */}
        <svg
          className="w-24 sm:w-28 md:w-32 xl:w-36 h-12 text-emerald-800/50 dark:text-emerald-400/50 pointer-events-none flex-shrink-0"
          viewBox="0 0 115 45"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Arrowhead pointing UP at the name on the left */}
          <path
            d="M 6 18 L 10 11 L 14 18"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dashed wave curve extending seamlessly to the photo */}
          <path
            d="M 10 12 C 10 34, 24 38, 44 38 C 72 38, 92 14, 115 25"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeDasharray="3 3"
            strokeLinecap="round"
          />
        </svg>

        {/* Refined Avatar Circle (Shifted a bit to right and lowered slightly) */}
        <div
          className="relative w-20 h-20 sm:w-22 sm:h-22 md:w-24 md:h-24 xl:w-26 xl:h-26 rounded-full shadow-xl hover:scale-105 transition-transform duration-300 z-10 cursor-pointer border border-black/10 dark:border-white/10 flex-shrink-0 translate-y-1 sm:translate-y-1.5"
          onMouseEnter={handleAvatarEnter}
          onMouseLeave={handleAvatarLeave}
          onClick={handleAvatarClick}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-[#181818] flex items-center justify-center text-white relative">
            {/* Regular Portrait Photo */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${isIronMan ? 'opacity-0' : 'opacity-100'
                }`}
            >
              <img
                src="/priyanshu.jpg"
                alt="Priyanshu Kumar Mahato"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
            {/* Iron Man / Tony Stark Avatar */}
            <div
              className={`absolute inset-0 transition-opacity duration-300 ${isIronMan ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <img
                src="/ironman.jpg"
                alt="Iron Man"
                className="w-full h-full object-cover object-center rounded-full"
              />
            </div>
          </div>

          {/* Click to unlock badge when freshly loaded */}
          {!isUnlocked && (
            <span className="absolute -bottom-5.5 left-1/2 -translate-x-1/2 text-[9px] font-bold font-Whyte text-[#ff4d00] tracking-tight whitespace-nowrap bg-white/95 dark:bg-[#1c1c1c]/95 px-2.5 py-0.5 rounded-full border border-[#ff4d00]/30 shadow-md animate-bounce select-none pointer-events-none">
              Click the avatar to unlock
            </span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="top" className="relative w-full min-h-screen overflow-hidden flex flex-col justify-start sm:justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-[8%] pt-28 sm:pt-32 md:pt-28 pb-12 sm:pb-16">
      {/* Preloaded AC/DC Audio Element */}
      <audio ref={audioRef} src={backInBlackAudio} preload="auto" />
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#ff4d00]/5 dark:bg-[#ff4d00]/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Desktop Top-Right Showcase (Screens >= 1280px) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="hidden xl:flex absolute top-20 xl:top-24 right-8 xl:right-16 z-20 pointer-events-auto"
      >
        {renderNameAvatarShowcase()}
      </motion.div>

      {/* Hero Core Content */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto flex flex-col justify-center">
        {/* Line 1: DESIGN Top Line */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="select-none"
        >
          <span className="text-[10vw] xs:text-[8.5vw] sm:text-[6.5vw] md:text-[4.5vw] lg:text-[3.8rem] font-extrabold tracking-widest text-[#1a1a1a] dark:text-white font-Array block uppercase leading-tight">
            DESIGN
          </span>
        </motion.div>

        {/* Line 2 (Colored): DRIVEN + 3D Toggle Pill Switch */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-6 md:gap-8 lg:gap-10 select-none -mt-1 sm:-mt-2">
          {/* DRIVEN Colored Text */}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[18vw] xs:text-[16vw] sm:text-[13vw] md:text-[10vw] lg:text-[9.5vw] xl:text-[11rem] leading-[0.85] font-extrabold tracking-tighter text-[#ff4d00] font-Whyte"
          >
            DRIVEN
          </motion.span>

          {/* 3D Interactive Toggle Pill Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative -ml-1 sm:ml-0 group cursor-pointer self-center select-none"
            onClick={() => setToggleRole((prev) => !prev)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setToggleRole((prev) => !prev);
              }
            }}
            aria-label="Toggle between Engineer and Developer"
          >
            {/* Realistic 3D Red Volumetric Capsule */}
            <div
              className={`relative w-[110px] h-[52px] xs:w-[130px] xs:h-[60px] sm:w-[165px] sm:h-[76px] md:w-[195px] md:h-[86px] rounded-full p-2 transition-all duration-300 flex items-center hover:scale-105 active:scale-95 ${toggleRole ? 'justify-end' : 'justify-start'
                }`}
              style={{
                background: 'linear-gradient(180deg, #ff4d4d 0%, #e62828 35%, #be1515 70%, #850c0c 100%)',
                boxShadow:
                  '0 12px 28px -4px rgba(185, 25, 25, 0.45), 0 4px 10px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.5), inset 0 -4px 8px rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
              }}
            >
              {/* 3D Porcelain White Disc Knob */}
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="h-full aspect-square rounded-full flex items-center justify-center cursor-pointer"
                style={{
                  background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #f6f6f6 55%, #dedede 100%)',
                  boxShadow:
                    '0 6px 16px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.25), inset 0 2px 4px #ffffff, inset 0 -3px 6px rgba(0, 0, 0, 0.15)',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                }}
              >
                {/* Subtle tactile center indent */}
                <div
                  className="w-1/3 h-1/3 rounded-full opacity-60"
                  style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0.18) 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25), 0 1px 1px rgba(255,255,255,0.8)',
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Line 3: Decrypted Text Word: ENGINEER <-> DEVELOPER */}
        <div className="relative h-[12vw] xs:h-[11vw] sm:h-[9vw] md:h-[7.5vw] lg:h-[8vw] xl:h-[10rem] mt-2 sm:mt-4 select-none flex items-center">
          <h2 className="text-[17vw] xs:text-[15.5vw] sm:text-[13vw] md:text-[10vw] lg:text-[9.5vw] xl:text-[11rem] leading-[0.85] font-extrabold tracking-tighter text-[#1a1a1a] dark:text-white font-Whyte block uppercase">
            <DecryptedText
              text={toggleRole ? 'DEVELOPER' : 'ENGINEER'}
              speed={75}
              maxIterations={15}
              sequential={true}
              revealDirection="start"
              characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-="
              className="text-[#1a1a1a] dark:text-white"
              encryptedClassName="text-[#1a1a1a] dark:text-white opacity-75 font-mono"
            />
          </h2>
        </div>

        {/* Mobile/Tablet In-Flow Showcase (Screens < 1280px, zero overlap with toggle) */}
        <div className="flex xl:hidden mt-6 mb-2 self-start sm:self-end">
          {renderNameAvatarShowcase()}
        </div>

        {/* Lower Row: Technologies Loop */}
        <div className="mt-6 sm:mt-8 md:mt-10 w-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-ping-slow flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-semibold tracking-tight font-Ovo">
              Technologies I Work With
            </span>
          </div>

          {/* Infinite Pure-Symbol Tech Marquee Loop */}
          <LogoLoop
            logos={techLogos}
            speed={24}
            direction="left"
            gap={48}
            logoSize={34}
            scaleOnHover={true}
            fadeOut={true}
            ariaLabel="Technologies I Work With"
          />
        </div>
      </div>
    </section>
  );
}
