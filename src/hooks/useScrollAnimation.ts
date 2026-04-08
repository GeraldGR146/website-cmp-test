import { useEffect, useRef, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollAnimation(options: { 
  threshold?: number; 
  rootMargin?: string; 
  triggerOnce?: boolean 
} = {}) {
  // We use a slightly positive rootMargin bottom to trigger BEFORE the user sees it
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  // Reset animations when navigating to a new page
  useEffect(() => {
    setIsVisible(false);
  }, [pathname]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    // This is the key: observe immediately. 
    // If the scroll is already at this element (Reload), it triggers instantly.
    observer.observe(element);
    
    return () => observer.disconnect();
  }, [pathname, threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

export function useCountUp(end: number, duration = 2000, startOnVisible = true) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!startOnVisible || !isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration, startOnVisible]);

  return { ref, count, isVisible };
}
