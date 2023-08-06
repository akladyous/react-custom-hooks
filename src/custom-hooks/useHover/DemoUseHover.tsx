import React, { useRef } from 'react';
import useHover from './useHover';

const DemoUseHover: React.FC = () => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isHovered = useHover(elementRef);

  return (
    <div ref={elementRef} className=' bg-slate-50 w-3/4 mx-auto my-3 p-3'>
      <h3>{isHovered ? 'Hovered' : 'Not Hovered'}</h3>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda,
        repudiandae cumque molestiae veniam optio ab, saepe quas illum sed
        facilis laboriosam eligendi nulla! Iure at dolorem, amet pariatur unde
        culpa?
      </p>
    </div>
  );
};

export default DemoUseHover;
