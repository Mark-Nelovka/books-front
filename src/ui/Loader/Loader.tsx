import React from "react";
import { FadeLoader, HashLoader, PropagateLoader } from "react-spinners";

export const Loader = ({ size }: { size?: string }): JSX.Element => {
  return (
    <div className="loader">
      <HashLoader color={"#4a56e2"} size={size} />
    </div>
  );
};

export const LoaderPropagate = ({ size }: { size?: string }): JSX.Element => {
  return (
    <div className="loader">
      <PropagateLoader color='#fff' size={size} />
    </div>
  );
};

export const LoaderFade = (): JSX.Element => {
  return (
    <div className="loader">
      <FadeLoader color='#367755' />
    </div>
  );
};
