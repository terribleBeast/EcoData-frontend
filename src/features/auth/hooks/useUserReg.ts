import { useCreateResearcherMutation } from "@/api/endpoints";
import type { ICreateUser } from "@/shared/types/user";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const useUserReg = () => {
  const navigate = useNavigate();

  const [register, registerResult] = useCreateResearcherMutation();

  const hasNavigated = useRef(false);
  useEffect(() => {
    if (
      registerResult.isSuccess &&
      registerResult.data &&
      !hasNavigated.current
    ) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [registerResult.isSuccess, registerResult.data, hasNavigated, navigate]);

  const handleReg = (userData: ICreateUser) => {
    register(userData);
  };

  return {
    handleReg,
    endpointState: {
      isLoading: registerResult.isLoading,
      isError: registerResult.isError,
      error: registerResult.error,
      isSuccess: registerResult.isSuccess,
    },
  };
};
