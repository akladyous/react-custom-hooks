import { useCallback, useState } from 'react';

export default function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleToggle = useCallback((value: boolean): void => {
    if (typeof value === 'boolean') {
      return setValue(value);
    }
    return setValue((v) => !v);
  }, []);

  return [value, handleToggle];
}
