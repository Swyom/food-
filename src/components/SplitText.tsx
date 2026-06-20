import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  triggerOnScroll?: boolean;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  duration = 0.8,
  stagger = 0.03,
  triggerOnScroll = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.split-char');
    
    // Clear styles first
    gsap.set(chars, { y: '100%', opacity: 0 });

    let triggerElement: Element | string = containerRef.current;

    // Standard entrance
    gsap.to(chars, {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: 'back.out(1.7)',
      scrollTrigger: triggerOnScroll
        ? {
            trigger: triggerElement,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        : undefined,
    });
  }, [text, delay, duration, stagger, triggerOnScroll]);

  return (
    <span
      ref={containerRef}
      className={`inline-block overflow-hidden py-2 ${className}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="split-char inline-block origin-bottom transform-gpu"
          style={{ display: char === ' ' ? 'inline' : 'inline-block', whiteSpace: 'pre' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
