import React from "react";

interface IHeader {
  children: React.ReactNode;
  // func?: (event: React.MouseEvent) => void;
}

export default function Header({ children }: IHeader): JSX.Element {
  return <header>{children}</header>;
}
