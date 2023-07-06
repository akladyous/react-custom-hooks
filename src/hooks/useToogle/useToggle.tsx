import { useCallback, useState } from 'react';

export default function useToggle(initialValue: boolean = false) {
  const [toggleState, setToggleState] = useState<boolean>(initialValue);

  const handleToggle = useCallback((checked: boolean): void => {
    if (typeof checked === 'boolean') {
      return setToggleState(checked);
    }
    return setToggleState((v) => !v);
  }, []);

  return [toggleState, handleToggle];
}
