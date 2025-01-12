import { useState, useEffect } from "react";

export const useClientSearchParams = () => {
  const [params, setParams] = useState<URLSearchParams | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setParams(new URLSearchParams(window.location.search));
    }
  }, []);

  return params;
};
