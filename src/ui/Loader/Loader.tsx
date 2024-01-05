import React from "react";
import { HashLoader } from "react-spinners";

export const Loader = ({ size }: { size?: string }): JSX.Element => {
  return (
    <div className="loader">
      <HashLoader color={"#4a56e2"} size={size} />;
    </div>
  );
};
