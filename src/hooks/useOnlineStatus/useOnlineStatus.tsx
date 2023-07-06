import { useCallback, useEffect, useState } from 'react';

export default function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState<boolean>(
    window.navigator.onLine,
  );

  const setOnline = useCallback((): void => {
    setOnlineStatus(true);
  }, []);
  const setOffline = useCallback((): void => {
    setOnlineStatus(false);
  }, []);

  useEffect(() => {
    window.addEventListener('online', setOnline);
    window.addEventListener('offline', setOffline);

    return () => {
      window.removeEventListener('online', setOnline);
      window.removeEventListener('offline', setOffline);
    };
  }, []);

  return onlineStatus;
}
