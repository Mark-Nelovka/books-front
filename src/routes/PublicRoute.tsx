import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hook';

export default function PublickRoute({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const isToken = useAppSelector((state) => state.auth.userRegistrInfo.token);
  useEffect(() => {
    if (isToken) {
      navigate('/home')
    }
  }, [])

  return <>{children}</>
}