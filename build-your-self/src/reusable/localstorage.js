import { useState, useEffect } from "react";
export function useSaveStorage(store, defaultValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(store);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return defaultValue;
  });
  useEffect(() => {
    localStorage.setItem(
      store,
      JSON.stringify(value)
    );
  }, [store, value]);
  return [value, setValue];
}