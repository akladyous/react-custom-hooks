import { useCallback, useState } from 'react';

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const handleToggle = useCallback((value) => {
    if (typeof value === 'boolean') {
      return setValue(value);
    }
    return setValue((v) => !v);
  }, []);

  return [value, handleToggle];
}
