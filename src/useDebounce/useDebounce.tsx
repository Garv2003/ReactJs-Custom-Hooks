import { useEffect } from "react";
import useTimeout from "../useTimeout/useTimeout";

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: number[]
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
