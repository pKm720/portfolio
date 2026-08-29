import React, { useRef, useEffect, useState } from 'react';

/**
 * LogoLoop - Monochromatic pure-symbol infinite tech marquee ticker (React Bits style).
 * - Only icons/symbols (no text labels)
 * - Physics-based graceful deceleration to 0 when hovering over any element
 * - Silky smooth acceleration back to cruising speed on mouse leave
 * - Scale & accent glow on individual symbol hover
 * - Edge fade masks for seamless visual blending
 */
export default function LogoLoop({
  logos = [],
  speed = 35,
  direction = 'left',
  gap = 52,
  logoSize = 36,
  scaleOnHover = true,
  fadeOut = true,
  ariaLabel = 'Technologies loop',
  className = '',
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const isHoveredRef = useRef(false);
  const offsetRef = useRef(0);
  const currentSpeedRef = useRef(speed * 0.025);
  const singleSetWidthRef = useRef(0);

  // Duplicate items 4 times to ensure seamless infinite looping on ultra-wide screens
  const items = [...logos, ...logos, ...logos, ...logos];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationFrameId;
    const baseSpeed = Math.max(0.2, (speed || 35) * 0.022);
    const dirMultiplier = direction === 'right' ? -1 : 1;

    // Calculate width of one complete set of logos for modulo wrapping
    const measureWidth = () => {
      if (track && track.children.length > 0) {
        const totalItems = track.children.length;
        const oneQuarterCount = Math.floor(totalItems / 4);
        let width = 0;
        for (let i = 0; i < oneQuarterCount; i++) {
          const child = track.children[i];
          if (child) {
            width += child.offsetWidth + gap;
          }
        }
        singleSetWidthRef.current = width > 0 ? width : 1200;
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    const loop = () => {
      const targetSpeed = isHoveredRef.current ? 0 : baseSpeed;

      // Physics ease: gracefully decelerate to 0 or accelerate to cruising speed
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.055;

      offsetRef.current += currentSpeedRef.current * dirMultiplier;

      const setWidth = singleSetWidthRef.current || 1200;

      // Wrap offset seamlessly
      if (offsetRef.current >= setWidth) {
        offsetRef.current %= setWidth;
      } else if (offsetRef.current < 0) {
        offsetRef.current = (offsetRef.current % setWidth) + setWidth;
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', measureWidth);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [logos, speed, direction, gap]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      className={`relative w-full overflow-hidden py-4 select-none ${className}`}
      style={
        fadeOut
          ? {
              maskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            }
          : undefined
      }
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max items-center will-change-transform"
        style={{
          gap: `${gap}px`,
        }}
      >
        {items.map((item, idx) => {
          const content = (
            <div
              className={`flex items-center justify-center transition-all duration-300 cursor-pointer ${
                scaleOnHover ? 'hover:scale-125' : ''
              }`}
              title={item.title || ''}
            >
              {item.node ? (
                <div
                  className="text-2xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-300 hover:text-[#ff4d00] dark:hover:text-white transition-colors duration-300 flex items-center justify-center"
                  style={{
                    fontSize: `${logoSize}px`,
                  }}
                >
                  {item.node}
                </div>
              ) : item.src ? (
                <img
                  src={item.src}
                  alt={item.alt || item.title || ''}
                  className="h-8 w-auto object-contain opacity-75 hover:opacity-100 transition-opacity"
                  style={{ height: `${logoSize}px` }}
                />
              ) : null}
            </div>
          );

          if (item.href) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="focus:outline-none"
                aria-label={item.title || 'Tech link'}
              >
                {content}
              </a>
            );
          }

          return (
            <div key={idx} className="flex items-center justify-center">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
