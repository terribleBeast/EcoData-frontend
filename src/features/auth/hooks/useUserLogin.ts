import { useLoginMutation } from "@/api/endpoints";
import type { ICheckExistUser } from "@/shared/types/user";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

export const useUserLogin = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();
  const hasNavigated = useRef(false);

  // Navigate on successful login (slice already updated via extraReducers)
  console.log(data, isSuccess);
  useEffect(() => {
    if (isSuccess && data && !hasNavigated.current) {
      hasNavigated.current = true;
      navigate("/");
    }
  }, [isSuccess, data, navigate]);

  const handleLogIn = (credentials: ICheckExistUser) => {
    login(credentials);
  };
  return { handleLogIn, isLoading, isError, error };
};
