import { useState, useEffect } from "react";

let globalIsLoading = false;

const listeners: ((v: boolean) => void)[] = [];

const notify = (value: boolean) => {
  globalIsLoading = value;
  listeners.forEach((listener) => listener(value));
};

export const startLoading = () => notify(true);
export const stopLoading = () => notify(false);

export function useIsLoading() {
  const [isLoading, setIsLoading] = useState(globalIsLoading);

  useEffect(() => {
    listeners.push(setIsLoading);

    return () => {
      const index = listeners.indexOf(setIsLoading);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return { isLoading, isLoadingStart: startLoading, isLoadingStop: stopLoading };
}
