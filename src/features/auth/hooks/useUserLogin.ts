import { useLoginMutation, useLazyGetMeQuery } from "@/api/endpoints";
import type { LoginRequest } from "@/shared/types/user";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

export const useUserLogin = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();

  const [ready, setReady] = useState(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (ready && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [ready, navigate]);

  const handleLogIn = async (credentials: LoginRequest) => {
    // 1. Login → token stored in localStorage + Redux (via authSlice matcher)
    await login(credentials).unwrap();

    // 2. Fetch current researcher profile → populates state.auth.me + state.auth.researcher
    await getMe().unwrap();

    // Both are now populated via authSlice matchers
    setReady(true);
  };

  return {
    handleLogIn,
    endpointState: {
      isLoading,
      isSuccess: ready,
      isError,
      error,
    },
  };
};
