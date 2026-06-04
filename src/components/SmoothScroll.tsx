import { useEffect } from 'react';

export default function SmoothScroll() {
  useEffect(() => {
    const scroll = {
      current: window.scrollY,
      target: window.scrollY,
      ease: 0.075, // Adjust for smoothness (lower = smoother/slower)
      last: 0,
    };

    let isScrolling = false;

    const onScroll = () => {
      scroll.target = window.scrollY;
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(update);
      }
    };

    const update = () => {
      const diff = scroll.target - scroll.current;
      const delta = Math.abs(diff);

      if (delta < 0.1) {
        scroll.current = scroll.target;
        isScrolling = false;
      } else {
        scroll.current += diff * scroll.ease;
        // We don't actually move the window here because that would cause an infinite loop
        // Instead, this logic is usually for custom scroll implementations.
        // For standard scroll, we rely on CSS scroll-behavior: smooth or a library.
        // Since I want to keep it simple and robust, I'll stick to CSS smooth scroll 
        // and focus on optimizing the animations themselves.
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return null;
}
