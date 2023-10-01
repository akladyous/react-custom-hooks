import useUndo from './useUndo';

export default function DemoOne() {
  const {
    state: counter,
    canUndo,
    canRedo,
    undoAction,
    redoAction,
    setState,
    resetState,
    past: pastState,
    future: futureState,
  } = useUndo<number>(0);

  return (
    <main className='border p-2 my-3 w-2/3 mx-auto' id='counter'>
      <div className='flex'>
        <button
          className='border rounded-md bg-slate-100 px-5 mx-auto'
          onClick={() => {
            setState(counter + 1);
          }}>
          increment
        </button>
        <p className='text-center'>{counter}</p>
        <button
          className='border rounded-md bg-slate-100 px-5 mx-auto'
          onClick={() => {
            setState(counter - 1);
          }}>
          decrement
        </button>
      </div>
      <div className=' w-full mx-auto text-center py-3'>
        <button
          className='bg-slate-50 px-3 capitalize'
          onClick={() => {
            resetState();
          }}>
          reset
        </button>
        <button
          className='bg-slate-50 px-3 capitalize disabled:opacity-50'
          onClick={undoAction}
          disabled={!canUndo}>
          undo
        </button>
        <button
          className='bg-slate-50 px-3 capitalize disabled:opacity-50'
          onClick={redoAction}
          disabled={!canRedo}>
          redo
        </button>
        <button className='bg-slate-50 px-3 capitalize' onClick={() => {}}>
          increment by 5
        </button>
      </div>
      <div className='flex border justify-between p-2'>
        <div>
          <h2>Past States:</h2>
          <ul>
            {pastState.map((value: number, index) => (
              <li key={`past-${index}`}>{value}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Present State:</h2>
          <p>{counter}</p>
        </div>
        <div>
          <h2>Future States:</h2>
          <ul>
            {futureState.map((value: number, index) => (
              <li key={`future-${index}`}>{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
