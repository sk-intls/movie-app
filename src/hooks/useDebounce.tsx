import { useRef, useEffect, useState } from "react";

export function useDebounce(term: string, timeout: number = 1000) {
  const [debounced, setDebounced] = useState(term);
  const currentTimeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (currentTimeout.current) {
      clearTimeout(currentTimeout.current);
    }
    currentTimeout.current = setTimeout(() => {
      setDebounced(term);
    }, timeout);
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout.current);
      }
    };
  }, [term, timeout]);
  return debounced;
}
