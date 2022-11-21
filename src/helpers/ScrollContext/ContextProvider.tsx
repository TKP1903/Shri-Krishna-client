import * as React from "react";
import { useEffect, useState, createContext, useRef } from "react";
import { throttle } from "../../utils/js";

const scrollMargin = 0.1;

const ScrollContext = createContext({
  scrollDirection: "none",
  setScrollDirection: (scrollDirection: "up" | "down" | "none") => {},
});

function ScrollContextProvider({ children }: { children: React.ReactNode }) {
  const [scrollDirection, setScrollDirection] = useState<
    "up" | "down" | "none"
  >("none");

  const onScrollRef = useRef(
    (() => {
      let lastY = window.scrollY;
      return throttle(() => {
        const currY = window.scrollY;
        console.log("scrolling", {
          lastY,
          currY,
        });
        if (Math.abs(currY - lastY) <= 0.5) {
          lastY = currY;
          setScrollDirection("none");
          return;
        }
        if (currY < lastY) {
          lastY = currY;
          setScrollDirection("up");
          return;
        }
        if (currY > lastY) {
          lastY = currY;
          setScrollDirection("down");
          return;
        }
        lastY = currY;
        setScrollDirection("none");
      }, 100);
    })()
  );
  const onScroll = onScrollRef.current;

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    console.log({ scrollDirection });
  }, [scrollDirection]);

  return (
    <ScrollContext.Provider value={{ scrollDirection, setScrollDirection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export { ScrollContext, ScrollContextProvider };
