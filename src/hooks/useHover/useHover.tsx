import { useState, useEffect, useCallback, RefObject } from 'react';

const useHover = <T extends HTMLElement>(elementRef: RefObject<T>): boolean => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const element = elementRef.current;

    if (element) {
      element.addEventListener('mouseenter', onMouseEnter);
      element.addEventListener('mouseleave', onMouseLeave);
    }
    return () => {
      if (element) {
        element.removeEventListener('mouseenter', onMouseEnter);
        element.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [elementRef]);

  return isHovered;
};

export default useHover;
