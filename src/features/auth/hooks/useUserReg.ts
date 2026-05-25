import { useCreateResearcherMutation } from "@/api/endpoints";
import type { ICreateUser } from "@/shared/types/user";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const useUserReg = () => {
  const navigate = useNavigate();

  const [register, { data, isLoading, isError, error, isSuccess }] =
    useCreateResearcherMutation();

  const hasNavigated = useRef(false);
  useEffect(() => {
    if (isSuccess && data && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [isSuccess, data, hasNavigated, navigate]);

  const handleReg = (userData: ICreateUser) => {
    register(userData);
  };

  return { handleReg, isLoading, isError, error };
};
