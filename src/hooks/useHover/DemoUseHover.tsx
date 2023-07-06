import React, { useRef } from 'react';
import useHover from './useHover';

const DemoUseHover: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(elementRef);

  return (
    <div ref={elementRef}>
      <h2>{isHovered ? 'Hovered' : 'Not Hovered'}</h2>
    </div>
  );
};

export default DemoUseHover;
