import { useCallback, useEffect, useState } from "react";

interface ScrollInfo {
  scrollY: number;
  scrollPercent: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollToTop: () => void;
}

/**
 * useScroll
 *
 * Tracks scroll position and provides scroll-related info about the page.
 *
 * @returns An object containing:
 * - `scrollY`: Current vertical scroll position.
 * - `scrollPercent`: How far the user has scrolled down (0–100%).
 * - `isAtTop`: Whether the user is at the top of the page.
 * - `isAtBottom`: Whether the user is at the bottom of the page.
 * - `scrollToTop()`: Smoothly scrolls to the top of the page.
 */
const useScroll = (): ScrollInfo => {
  const [scrollInfo, setScrollInfo] = useState<ScrollInfo>({
    scrollY: 0,
    scrollPercent: 0,
    isAtTop: false,
    isAtBottom: false,
    scrollToTop: () => {},
  });

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const updateScrollInfo = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      const maxScroll = documentHeight - viewportHeight;
      const scrollPercent = maxScroll <= 0 ? 100 : Math.min(100, Math.round((scrollY / maxScroll) * 100));

      setScrollInfo({
        scrollY,
        scrollPercent,
        isAtTop: scrollY === 0,
        isAtBottom: Math.ceil(scrollY + viewportHeight) >= documentHeight,
        scrollToTop,
      });

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollInfo);
        ticking = true;
      }
    };

    updateScrollInfo();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollInfo, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollInfo);
    };
  }, [scrollToTop]);

  return scrollInfo;
};

export default useScroll;
