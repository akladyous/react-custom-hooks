import { useEffect, useRef } from 'react';

const useRenderCount = () => {
  const count = useRef(0);
  useEffect(() => {
    count.current++;
  });
  return count.current;
};

export default useRenderCount;
