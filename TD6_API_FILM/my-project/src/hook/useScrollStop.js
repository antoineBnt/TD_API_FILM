import { useState, useEffect } from "react";

function useScrollStop(delay = 200) {
  const [isScrollStopped, setIsScrollStopped] = useState(false);

  useEffect(() => {
    let timer = null;

    const handleScroll = () => {
      setIsScrollStopped(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsScrollStopped(true);
      }, delay);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [delay]);

  return isScrollStopped;
}

export default useScrollStop;
