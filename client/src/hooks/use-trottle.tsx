import { useEffect, useRef, useState } from 'react';

const useThrottle = (throttleTime: number) => {
  const [throttledText, setThrottledText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const setValue = (value: string) => setThrottledText(value);

  useEffect(() => {
    const value = inputRef.current?.value || '';
    let timer = setTimeout(() => {
      setValue(value);
    }, throttleTime);
    return () => clearTimeout(timer);
  }, [throttleTime, inputRef]);

  return {
    inputRef,
    setValue,
    text: throttledText,
  };
};
export default useThrottle;
