import { useEffect, useRef } from 'react';

const useRenderCount = () => {
  const count = useRef(0);
  const initialRerender = useRef(true);
  useEffect(() => {
    if (initialRerender.current) {
      initialRerender.current = false;
    } else {
      count.current++;
    }
  });
  return count.current;
};

export default useRenderCount;
