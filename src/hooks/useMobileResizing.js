import { useState, useEffect } from "react";

export default function useMobileResizing(breakpoint = 768) {
  const isWindowDefined = typeof window !== "undefined";
  const [isMobile, setIsMobile] = useState(
    isWindowDefined ? window.innerWidth <= breakpoint : false,
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
