import { useCallback, useState } from "react";

/**
 * useCopyToClipboard
 *
 * Copies a given string to the user's clipboard.
 *
 * @returns An object containing:
 * - `copiedText`: The most recently copied text.
 * - `copyToClipboard`: Function to copy a string to the clipboard.
 */
const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>("");

  const copyToClipboard = useCallback((value: string) => {
    const handleCopy = async () => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(value);
        }
        setCopiedText(value);
      } catch (e) {
        console.error("Failed to copy text:", e);
      }
    };

    handleCopy();
  }, []);

  return { copiedText, copyToClipboard };
};

export default useCopyToClipboard;
