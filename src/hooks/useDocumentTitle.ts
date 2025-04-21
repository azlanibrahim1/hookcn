import { useEffect } from "react";

/**
 * useDocumentTitle
 *
 * Sets the document's title to the provided string.
 *
 * @param title - The string to set as the document title.
 *
 */
const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default useDocumentTitle;
