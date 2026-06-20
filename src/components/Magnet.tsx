import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MagnetProps {
  children: React.ReactElement;
  range?: number;
  sensitivity?: number;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  range = 45,
  sensitivity = 0.35,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const inner = el.firstElementChild as HTMLElement;
    if (!inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Check if mouse is within range
      const distance = Math.sqrt(x*x + y*y);

      if (distance < range) {
        // Apply magnetic pull
        gsap.to(inner, {
          x: x * sensitivity,
          y: y * sensitivity,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        // Return to center
        gsap.to(inner, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1.1, 0.4)',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [range, sensitivity]);

  return (
    <div ref={elementRef} className="inline-block">
      {React.cloneElement(children, {
        className: `${children.props.className || ''} transform-gpu`,
      })}
    </div>
  );
};
