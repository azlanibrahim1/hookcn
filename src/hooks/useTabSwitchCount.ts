import { useState, useEffect, useCallback } from "react";

/**
 * useTabSwitchCount
 *
 * Counts how many times the user has switched away from the browser tab.
 *
 * @returns The number of times the document has become hidden.
 */
const useTabSwitchCount = () => {
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setTabSwitchCount((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  return tabSwitchCount;
};

export default useTabSwitchCount;
