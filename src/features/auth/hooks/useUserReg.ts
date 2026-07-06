import { useRegisterMutation, useLoginMutation } from "@/api/endpoints";
import type { RegisterRequest } from "@/shared/types/user";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLazyGetMeQuery } from "@/api/endpoints";

export const useUserReg = () => {
  const navigate = useNavigate();

  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const [login] = useLoginMutation();
  const [getMe] = useLazyGetMeQuery();

  const [ready, setReady] = useState(false);
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (ready && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [ready, navigate]);

  const handleReg = async (userData: RegisterRequest) => {
    // 1. Register → creates researcher + auth (returns UUID)
    await register(userData).unwrap();

    // 2. Login with the same credentials
    await login({
      email: userData.email,
      password: userData.password,
    }).unwrap();

    // 3. Fetch researcher profile → populates auth state
    await getMe().unwrap();

    setReady(true);
  };

  return {
    handleReg,
    endpointState: {
      isLoading,
      isSuccess: ready,
      isError,
      error,
    },
  };
};
