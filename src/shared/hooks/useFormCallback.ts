import { useCallback, useRef } from "react";

export const useSuccessNavigation = (
  navigateTo: () => void,
  delayMs = 3000,
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onSuccess = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      navigateTo();
    }, delayMs);
  }, [navigateTo, delayMs]);

  return onSuccess;
};
