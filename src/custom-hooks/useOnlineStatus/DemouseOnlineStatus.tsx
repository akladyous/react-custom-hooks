import useOnlineStatus from './useOnlineStatus';
import useRenderCount from '../useRenderCount/useRenderCount';

const DemouseOnlineStatus = () => {
  const isOnline = useOnlineStatus();
  const renderCount = useRenderCount();

  return (
    <div>
      <p>{renderCount}</p>
      <h1>Online Status: {isOnline ? 'Online' : 'Offline'}</h1>
    </div>
  );
};

export default DemouseOnlineStatus;
