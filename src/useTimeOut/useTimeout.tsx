import { useCallback, useEffect, useRef } from "react";

type TimeoutReturn = {
  reset: () => void;
  clear: () => void;
};

export default function useTimeOut(
  callback: () => void,
  delay: number
): TimeoutReturn {
  const callbackRef = useRef<() => void>();
  const timeoutRef = useRef<number | undefined>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current?.(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
