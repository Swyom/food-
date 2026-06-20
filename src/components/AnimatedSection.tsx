import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale-in' | 'fade-in';
  duration?: number;
  delay?: number;
  stagger?: number;
  className?: string;
  threshold?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-up',
  duration = 0.8,
  delay = 0,
  stagger = 0.15,
  className = '',
  threshold = 0.15,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let initialStyles: gsap.TweenVars = {};
    let targetStyles: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power3.out',
    };

    switch (animation) {
      case 'fade-up':
        initialStyles = { opacity: 0, y: 50 };
        targetStyles = { ...targetStyles, y: 0 };
        break;
      case 'fade-in':
        initialStyles = { opacity: 0 };
        break;
      case 'slide-left':
        initialStyles = { opacity: 0, x: -70 };
        targetStyles = { ...targetStyles, x: 0 };
        break;
      case 'slide-right':
        initialStyles = { opacity: 0, x: 70 };
        targetStyles = { ...targetStyles, x: 0 };
        break;
      case 'scale-in':
        initialStyles = { opacity: 0, scale: 0.85 };
        targetStyles = { ...targetStyles, scale: 1, ease: 'back.out(1.4)' };
        break;
    }

    gsap.set(el, initialStyles);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Check if children are staggable
          const childrenToAnimate = el.querySelectorAll('.stagger-item');
          
          if (childrenToAnimate.length > 0) {
            // Set parents invisible initially
            gsap.set(el, { opacity: 1 });
            gsap.set(childrenToAnimate, initialStyles);
            gsap.to(childrenToAnimate, {
              ...targetStyles,
              delay: delay,
              stagger: stagger,
            });
          } else {
            // Animate container itself
            gsap.to(el, targetStyles);
          }
          
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [animation, duration, delay, stagger, threshold]);

  return (
    <div ref={containerRef} className={`${className} opacity-0`}>
      {children}
    </div>
  );
};
