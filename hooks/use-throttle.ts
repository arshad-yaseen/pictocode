import { useRef } from 'react';

// Define a generic type for the callback function
type CallbackFunction = (...args: any[]) => void;

const useThrottle = (callback: CallbackFunction, delay: number): CallbackFunction => {
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);

  const throttledFunction: CallbackFunction = (...args) => {
    if (!throttleTimeout.current) {
      throttleTimeout.current = setTimeout(() => {
        callback(...args);
        throttleTimeout.current = null;
      }, delay);
    }
  };

  return throttledFunction;
};

export default useThrottle;
