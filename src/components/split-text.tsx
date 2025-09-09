
'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right';
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className,
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'left',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, inView } = useInView({
    threshold,
    rootMargin,
    triggerOnce: true,
  });

  useGSAP(() => {
    if (inView && containerRef.current) {
      const elements = containerRef.current.children;
      gsap.fromTo(
        elements,
        { ...from },
        {
          ...to,
          duration,
          ease,
          stagger: delay / 1000,
          onComplete: onLetterAnimationComplete,
        }
      );
    }
  }, [inView]);

  const splitText = (text: string) => {
    if (splitType === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} style={{ display: 'inline-block' }}>
          {word}&nbsp;
        </span>
      ));
    }
    return text.split('').map((char, index) => (
      <span key={index} style={{ display: 'inline-block' }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const textAlignStyle = {
    textAlign: textAlign,
  };

  return (
    <div ref={ref} className={cn('split-text-container', className)} style={textAlignStyle}>
      <div ref={containerRef} style={{ display: 'inline-block' }}>
          {splitText(text)}
      </div>
    </div>
  );
};

export default SplitText;
