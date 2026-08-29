import React, { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrolled = (window.scrollY / windowHeight) * 100;
        setScrollPercentage(scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#ff8c42] via-[#ff6a00] to-[#ff4d00] transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,77,0,0.7)]"
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
}
