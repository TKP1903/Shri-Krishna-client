import * as React from "react";

const { useEffect, useRef } = React;

export default function BlackScreen({
  show,
  message = "You are out of focus,\nPlease keep the focus on the screen.",
}: {
  show: boolean;
  message?: string;
}) {
  const defaultBodyStyleRef = useRef<any>(null);

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body || !defaultBodyStyleRef.current) {
      defaultBodyStyleRef.current = body?.style || null;
      return;
    }
    const defaultBodyStyle = defaultBodyStyleRef.current as any;
    if (show) {
      body.style.display = defaultBodyStyle.display;
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = "0";
      body.style.left = "0";
      body.style.right = "0";
      body.style.bottom = "0";
    } else {
      body.style.overflow = defaultBodyStyle.overflow;
      body.style.position = defaultBodyStyle.position;
      body.style.top = defaultBodyStyle.top;
      body.style.left = defaultBodyStyle.left;
      body.style.right = defaultBodyStyle.right;
      body.style.bottom = defaultBodyStyle.bottom;
    }
  }, [show]);
  // cover the screen with a black screen
  // if show is true else don't display the overlay
  if (!show) {
    return <></>;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        opacity: 0.97,

        transition: "opacity 0.5s",
        zIndex: "1000!important",
      }}
    >
      {message && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}
