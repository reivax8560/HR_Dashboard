import { useState, useEffect } from "react";

// Hook réutilisable pour détecter si l'écran est mobile selon un breakpoint
export default function useMobileResizing(breakpoint = 768) {
  const isWindowDefined = typeof window !== "undefined";
  const [isMobile, setIsMobile] = useState(
    isWindowDefined ? window.innerWidth <= breakpoint : false
  );

  useEffect(() => {
    if (!isWindowDefined) return;

    function handleResize() {
      setIsMobile(window.innerWidth <= breakpoint);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint, isWindowDefined]);

  return isMobile;
}
