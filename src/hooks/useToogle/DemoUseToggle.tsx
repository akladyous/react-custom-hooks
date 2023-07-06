import React, { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import useToggle from './useToggle';
import useRenderCount from '../useRenderCount/useRenderCount';

export default function DemoUseToggle() {
  const [on, toggle] = useToggle(false);
  const count = useRenderCount();

  return (
    <section>
      <div className='border w-fit p-2 my-4 mx-auto'>
        <p>
          {'re-render count '}
          {count}
        </p>
      </div>
      <div className='flex items-center'>
        <label
          className='text-white text-[15px] leading-none pr-[15px]'
          htmlFor='airplane-mode'
        >
          Airplane mode
        </label>
        <Switch.Root
          checked={on}
          onCheckedChange={() => {
            console.log('onChange : ', on);
            toggle(!on);
          }}
          className='w-[42px] h-[25px] bg-blackA9 rounded-full relative shadow-[0_2px_10px] shadow-blackA7 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black outline-none cursor-default'
          id='airplane-mode'
        >
          <Switch.Thumb className='block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
        </Switch.Root>
      </div>
    </section>
  );
}
