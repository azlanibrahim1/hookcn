import { useState, useEffect, RefObject } from "react";

/**
 * useInViewport
 *
 * Detects when an element is visible within the viewport.
 *
 * @param ref - A React ref pointing to the DOM element you want to observe.
 * @param threshold - Optional. A number between 0 and 1 indicating how much of the element must be visible
 *                    before it's considered in the viewport.
 *                    Default is 0.1 (10% of the element must be visible).
 * @param rootMargin - Optional. A margin around the viewport in pixels.
 *                     For example, `100` will be interpreted as "100px".
 *
 * @returns `true` if the element is in the viewport, otherwise `false`.
 */
function useInViewport(ref: RefObject<HTMLElement | null>, threshold: number = 0.1, rootMargin: number = 0): boolean {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: `${rootMargin}px`,
        threshold: threshold,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, rootMargin, threshold]);

  return isInViewport;
}

export default useInViewport;
