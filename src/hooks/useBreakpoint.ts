import { useLayoutEffect, useState } from "react";

/**
 * useBreakpoint
 *
 * Detects if the current screen size matches mobile, tablet, or desktop breakpoints.
 *
 * @returns An object containing:
 * - `isMobileSize`: `true` if width is less than 768px.
 * - `isTabletSize`: `true` if width is between 768px and 1023px.
 * - `isDesktopSize`: `true` if width is 1024px or more.
 */
const useBreakpoint = () => {
  const [deviceSize, setDeviceSize] = useState({
    isMobileSize: false,
    isTabletSize: false,
    isDesktopSize: false,
  });

  useLayoutEffect(() => {
    const handleWindowSize = () => {
      setDeviceSize({
        isMobileSize: window.innerWidth < 768,
        isTabletSize: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktopSize: window.innerWidth >= 1024,
      });
    };

    handleWindowSize();
    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  return deviceSize;
};

export default useBreakpoint;
