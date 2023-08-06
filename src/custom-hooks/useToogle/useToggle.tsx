import { useCallback, useState } from 'react';

interface ToggleData {
  value: boolean;
  toggle: (toggleState?: boolean) => void;
}

const useToggle = (initialValue: boolean = false): ToggleData => {
  const [toggleState, setToggleState] = useState<boolean>(initialValue);

  const toggle = useCallback((newToggleState?: boolean) => {
    if (typeof newToggleState === 'boolean') {
      setToggleState(newToggleState);
    } else {
      setToggleState((prevState) => !prevState);
    }
  }, []);

  return {
    value: toggleState,
    toggle,
  };
};

export default useToggle;
