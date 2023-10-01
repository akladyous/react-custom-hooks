import { useState } from 'react';
import useUndo from './useUndo';

export default function DemoOne() {
  const { state: counter, canUndo, canRedo, undoAction, redoAction, setState } = useUndo<number>(0);

  // const counter = state as number;
  const increment = () => {
    setState(counter + 1);
  };
  const decrement = () => {
    setState(counter - 1);
  };
  const reset = () => {
    setState(0);
  };
  return (
    <main className='border p-2 my-3 w-2/3 mx-auto' id='counter'>
      <div className='flex'>
        <button className='border rounded-md bg-slate-100 px-5 mx-auto' onClick={increment}>
          increment
        </button>
        <p className='text-center'>{counter}</p>
        <button className='border rounded-md bg-slate-100 px-5 mx-auto' onClick={decrement}>
          decrement
        </button>
      </div>
      <div className=' w-full mx-auto text-center py-3'>
        <button className='bg-slate-50 px-3 capitalize' onClick={reset}>
          reset
        </button>
        <button className='bg-slate-50 px-3 capitalize' onClick={() => {}}>
          increment by 5
        </button>
      </div>
    </main>
  );
}
