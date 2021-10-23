import { useEffect, useState } from "react";

// NOTE: only use this if there's a few items in your project requiring
// a media query, otherwise you'll have tons of event listeners setup
// for lots of stuff or many breakpoints recreate and use global context
// and remake, note: matchmedia returns a media query list
// https://betterprogramming.pub/how-to-use-media-queries-programmatically-in-react-4d6562c3bc97

const useResponsive = (mediaQuery) => {
  // expected media query in form of "(max-width: 475px)"
  const [isMediaQuery, setIsMediaQuery] = useState(null);

  useEffect(() => {
    let mql = window.matchMedia(mediaQuery);

    const handleResize = () => {
      mql = window.matchMedia(mediaQuery);

      if (mql.matches) {
        setIsMediaQuery(true);
      } else {
        setIsMediaQuery(false);
      }
    };

    if (mql.matches) {
      setIsMediaQuery(true);
    } else {
      setIsMediaQuery(false);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mediaQuery]);

  return isMediaQuery;
};

export default useResponsive;
