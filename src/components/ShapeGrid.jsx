import React, { useRef, useEffect, useState } from 'react';

/**
 * ShapeGrid - Full-page animated interactive canvas grid background.
 * - Fluid movement when viewing Hero section.
 * - Smooth physics deceleration to a static state when scrolled past Hero.
 * - Seamless re-acceleration when scrolling back to Hero.
 * - Interactive mouse hover highlighting anywhere on the page.
 */
export default function ShapeGrid({
  speed = 0.45,
  squareSize = 42,
  direction = 'diagonal', // 'up' | 'down' | 'left' | 'right' | 'diagonal'
  borderColor,
  hoverFillColor,
  hoverColor,
  shape = 'square', // 'square' | 'circle' | 'hexagon' | 'triangle'
  hoverTrailAmount = 1,
  className = '',
}) {
  const canvasRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let gridOffset = { x: 0, y: 0 };
    let mousePos = { x: -1000, y: -1000 };
    let hoveredCells = new Map(); // key: "x,y", value: { intensity: 1 }

    // Smooth speed interpolation (physics ease in / ease out)
    let currentSpeed = speed;
    let targetSpeed = speed;

    const handleResize = () => {
      if (!canvas) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Track mouse position over the entire viewport
    const handleMouseMove = (e) => {
      mousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mousePos = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Scroll listener & Hero observer to control grid movement seamlessly
    const heroEl = document.getElementById('top');
    let heroObserver;

    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            targetSpeed = speed;
          } else {
            targetSpeed = 0; // Seamlessly brake to static grid
          }
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0] }
      );
      heroObserver.observe(heroEl);
    } else {
      // Fallback scroll check
      const handleScroll = () => {
        if (window.scrollY < 400) {
          targetSpeed = speed;
        } else {
          targetSpeed = 0;
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Direction vector
    const getDirectionUnit = () => {
      switch (direction) {
        case 'up':
          return { x: 0, y: -1 };
        case 'down':
          return { x: 0, y: 1 };
        case 'left':
          return { x: -1, y: 0 };
        case 'right':
          return { x: 1, y: 0 };
        case 'diagonal':
        default:
          return { x: 0.707, y: 0.707 };
      }
    };

    const dirUnit = getDirectionUnit();
    const size = Math.max(12, Number(squareSize) || 42);

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate currentSpeed towards targetSpeed (friction / acceleration)
      currentSpeed += (targetSpeed - currentSpeed) * 0.045;

      // Only increment offset if speed is non-negligible
      if (Math.abs(currentSpeed) > 0.001) {
        gridOffset.x = (gridOffset.x + dirUnit.x * currentSpeed) % size;
        gridOffset.y = (gridOffset.y + dirUnit.y * currentSpeed) % size;
      }

      // Theme colors
      const defaultBorder = isDark
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.055)';
      const effectiveBorder = borderColor || defaultBorder;

      const defaultHover = isDark
        ? 'rgba(255, 77, 0, 0.15)'
        : 'rgba(255, 77, 0, 0.08)';
      const effectiveHover = hoverFillColor || hoverColor || defaultHover;

      const numCols = Math.ceil(width / size) + 2;
      const numRows = Math.ceil(height / size) + 2;

      // Decay hovered cells
      hoveredCells.forEach((cell, key) => {
        cell.intensity -= 0.025;
        if (cell.intensity <= 0) {
          hoveredCells.delete(key);
        }
      });

      // Find cell under mouse
      if (
        mousePos.x >= 0 &&
        mousePos.y >= 0 &&
        mousePos.x <= width &&
        mousePos.y <= height
      ) {
        const col = Math.floor((mousePos.x - gridOffset.x) / size);
        const row = Math.floor((mousePos.y - gridOffset.y) / size);
        hoveredCells.set(`${col},${row}`, { intensity: 1 });

        if (hoverTrailAmount > 0) {
          for (let dx = -hoverTrailAmount; dx <= hoverTrailAmount; dx++) {
            for (let dy = -hoverTrailAmount; dy <= hoverTrailAmount; dy++) {
              if (Math.abs(dx) + Math.abs(dy) <= hoverTrailAmount) {
                const key = `${col + dx},${row + dy}`;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const targetIntensity = Math.max(0, 0.7 - dist * 0.3);
                const existing = hoveredCells.get(key);
                if (!existing || existing.intensity < targetIntensity) {
                  hoveredCells.set(key, { intensity: targetIntensity });
                }
              }
            }
          }
        }
      }

      // Render grid cells
      for (let i = -1; i < numCols; i++) {
        for (let j = -1; j < numRows; j++) {
          const x = i * size + gridOffset.x;
          const y = j * size + gridOffset.y;
          const key = `${i},${j}`;
          const hovered = hoveredCells.get(key);

          // Draw hover fill
          if (hovered && hovered.intensity > 0) {
            ctx.save();
            ctx.globalAlpha = hovered.intensity;
            ctx.fillStyle = effectiveHover;

            if (shape === 'square') {
              ctx.fillRect(x, y, size, size);
            } else if (shape === 'circle') {
              ctx.beginPath();
              ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2);
              ctx.fill();
            } else if (shape === 'triangle') {
              ctx.beginPath();
              ctx.moveTo(x + size / 2, y);
              ctx.lineTo(x + size, y + size);
              ctx.lineTo(x, y + size);
              ctx.closePath();
              ctx.fill();
            }
            ctx.restore();
          }

          // Draw border outline
          ctx.strokeStyle = effectiveBorder;
          ctx.lineWidth = 1;

          if (shape === 'square') {
            ctx.strokeRect(x, y, size, size);
          } else if (shape === 'circle') {
            ctx.beginPath();
            ctx.arc(x + size / 2, y + size / 2, size / 2 - 2, 0, Math.PI * 2);
            ctx.stroke();
          } else if (shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(x + size / 2, y);
            ctx.lineTo(x + size, y + size);
            ctx.lineTo(x, y + size);
            ctx.closePath();
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (heroObserver) heroObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed, squareSize, direction, borderColor, hoverFillColor, hoverColor, shape, hoverTrailAmount, isDark]);

  return (
    <div className={`fixed inset-0 w-full h-full pointer-events-none select-none -z-10 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
