// src/hooks/useDebounce.js
import { useEffect, useState } from "react";

/**
 * useDebounce(value, delay)
 * returns the debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}
