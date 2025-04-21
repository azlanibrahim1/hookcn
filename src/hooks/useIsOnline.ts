import { useState, useEffect } from "react";

/**
 * useIsOnline
 *
 * Tracks whether the browser is currently online or offline.
 *
 * @returns `true` if the browser is online, otherwise `false`.
 */
const useIsOnline = () => {
  const [isOnline, setOnline] = useState(navigator.onLine);

  const handleOnline = () => setOnline(true);
  const handleOffline = () => setOnline(false);

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};

export default useIsOnline;
