
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence,
  manualMode = false,
  blurAmount = 5,
  borderColor = 'transparent',
  animationDuration = 1,
  pauseBetweenAnimations = 0.5,
  className,
}) => {
  const words = sentence.split(' ');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (manualMode) return;

    const totalAnimationTime = (animationDuration + pauseBetweenAnimations) * 1000;
    let currentIndex = 0;

    const interval = setInterval(() => {
      setFocusedIndex(currentIndex);
      currentIndex = (currentIndex + 1) % words.length;
    }, totalAnimationTime);

    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  const getWordStyle = (index: number): React.CSSProperties => {
    const isFocused = index === focusedIndex;
    return {
      filter: isFocused ? 'blur(0)' : `blur(${blurAmount}px)`,
      transition: `filter ${animationDuration}s ease-in-out`,
      borderBottom: isFocused ? `2px solid ${borderColor}` : '2px solid transparent',
      paddingBottom: '2px',
    };
  };

  return (
    <div className={cn("flex justify-center items-center gap-2", className)}>
      {words.map((word, index) => (
        <span key={index} style={getWordStyle(index)} className="transition-all">
          {word}
        </span>
      ))}
    </div>
  );
};

export default TrueFocus;
