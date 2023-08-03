import DemoUseToggle from './hooks/useToogle/DemoUseToggle';
import DemouseOnlineStatus from './hooks/useOnlineStatus/DemouseOnlineStatus';
import DemoUseHover from './hooks/useHover/DemoUseHover';
import DemoUseLockBody from './hooks/useLockBody/DemoUseLockBody';

function App() {
  return (
    <main className='w-4/5 border m-5 p-2 min-h-screen mx-auto'>
      <DemoUseToggle />
      <DemouseOnlineStatus />
      <DemoUseHover />
      <DemoUseLockBody />
    </main>
  );
}

export default App;
