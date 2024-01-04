import React, { useEffect } from "react";

interface IBackdrop {
  children: React.ReactNode;
  toggleFunc: (e: React.MouseEvent) => void;
}

export default function Backdrop({
  children,
  toggleFunc,
}: IBackdrop): JSX.Element {
  const checkKeyboardEvent = (event: any) => {
    if (event.key === "Escape") {
      toggleFunc(event);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", checkKeyboardEvent);
    return () => {
      window.removeEventListener("keydown", checkKeyboardEvent);
    };
  }, []);

  return (
    <div
      id="backdrop"
      data-backdrop={false}
      onClick={(e) => toggleFunc(e)}
      className="backdrop"
    >
      {children}
    </div>
  );
}
