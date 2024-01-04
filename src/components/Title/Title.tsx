import React from "react";

interface ITitle {
  children: React.ReactNode;
  style: string;
  h: number;
}

export default function Title({ children, style, h }: ITitle): JSX.Element {
  switch (h) {
    case 1:
      return <h1 className={style}>{children}</h1>;
    case 2:
      return <h2 className={style}>{children}</h2>;
    case 3:
      return <h3 className={style}>{children}</h3>;
    case 4:
      return <h4 className={style}>{children}</h4>;
    case 5:
      return <h5 className={style}>{children}</h5>;
    case 6:
      return <h6 className={style}>{children}</h6>;
    default:
      return <h2 className={style}>{children}</h2>;
  }
}
