import React from "react";

interface IButton {
  style: string;
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  func?: (e: React.MouseEvent) => void;
  id: string;
  disabled?: boolean;
  backdrop?: boolean;
}

export default function Button({
  children,
  style,
  func,
  type,
  id,
  disabled,
  backdrop
}: IButton): JSX.Element {
  return (
    <button
      id={id}
      data-backdrop={backdrop}
      onClick={func}
      type={type}
      disabled={disabled}
      className={style}
    >
      {children}
    </button>
  );
}
