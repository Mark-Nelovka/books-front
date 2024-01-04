import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "store/hook";
export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const isToken = useAppSelector((state) => state.auth.token);
  useEffect(() => {
    if (!isToken) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}
