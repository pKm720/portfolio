import React, { useState, useEffect, useRef } from 'react';

/**
 * DecryptedText - Cyber scramble/matrix text decryption effect.
 */
export default function DecryptedText({
  text = '',
  speed = 70,
  maxIterations = 15,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=',
  sequential = true,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  encryptedClassName = '',
  parentClassName = '',
  animateOn = 'change',
}) {
  const safeText = typeof text === 'string' ? text : String(text || '');
  const [displayText, setDisplayText] = useState(safeText);
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef(null);
  const prevTextRef = useRef(safeText);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(safeText.split(''))).filter((c) => c !== ' ').join('') || characters
    : characters;

  const getRandomChar = () => {
    if (!availableChars || availableChars.length === 0) return '*';
    return availableChars[Math.floor(Math.random() * availableChars.length)] || '*';
  };

  const startDecryption = (targetText) => {
    if (!targetText) {
      setDisplayText('');
      return;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsScrambling(true);

    const length = targetText.length;
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      iteration++;

      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' ';

          let threshold;
          if (sequential) {
            if (revealDirection === 'start') {
              threshold = (index / length) * maxIterations;
            } else if (revealDirection === 'end') {
              threshold = ((length - 1 - index) / length) * maxIterations;
            } else {
              const mid = length / 2;
              threshold = (Math.abs(index - mid) / (mid || 1)) * maxIterations;
            }
          } else {
            threshold = maxIterations * 0.7;
          }

          if (iteration >= threshold + maxIterations * 0.25) {
            return char;
          }

          return getRandomChar();
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= maxIterations + (sequential ? length * 1.2 : 4)) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayText(targetText);
        setIsScrambling(false);
      }
    }, Math.max(10, speed));
  };

  useEffect(() => {
    startDecryption(safeText);
    prevTextRef.current = safeText;

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [safeText]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover' && !isScrambling) {
      startDecryption(safeText);
    }
  };

  const currentDisplay = displayText || safeText;

  return (
    <span
      className={`inline-block select-none ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
    >
      {currentDisplay.split('').map((char, idx) => {
        const isTargetChar = char === safeText[idx];
        return (
          <span
            key={idx}
            className={isTargetChar ? className : (encryptedClassName || 'text-current opacity-75')}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
