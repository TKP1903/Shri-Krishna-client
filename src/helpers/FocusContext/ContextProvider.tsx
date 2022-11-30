import * as React from "react";

const { createContext, useState, useContext, useEffect } = React;

const FocusContext = createContext({
  isFocus: true,
  onFocus: () => {},
  onBlur: () => {},
});

function FocusProvider({ children }: { children: React.ReactNode }) {
  const [isFocus, setIsFocus] = useState<boolean>(true);
  const onFocus = () => setIsFocus(true);
  const onBlur = () => setIsFocus(false);

  useEffect(() => {
    const checkTabFocused = () => {
      ((onFocus: Function, onBlur: Function) => {
        try {
          if (document.visibilityState === "visible") {
            onFocus();
          } else {
            onBlur();
          }
        } catch (err) {
          console.log(err);
        }
      })(onFocus, onBlur);
    };
    window.onpageshow = onFocus;
    window.onpagehide = onBlur;
    document.addEventListener("visibilitychange", checkTabFocused);
    return () => {
      document.removeEventListener("visibilitychange", checkTabFocused);
    };
  }, []);

  return (
    <FocusContext.Provider value={{ isFocus, onFocus, onBlur }}>
      {children}
    </FocusContext.Provider>
  );
}

export { FocusContext, FocusProvider };
