import React from "react";

interface IHeader {
  children: React.ReactNode;
  style?: string;
  // func?: (event: React.MouseEvent) => void;
}

export default function Header({ children, style }: IHeader): JSX.Element {
  return <header className={style}>{children}</header>;
}
