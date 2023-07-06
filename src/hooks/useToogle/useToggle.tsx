import { useCallback, useState } from 'react';

type ToggleState = boolean;
type ToggleHandler = (toggleState?: ToggleState) => void;

const useToggle = (
  initialValue: ToggleState = false,
): [ToggleState, ToggleHandler] => {
  const [toggleState, setToggleState] = useState<ToggleState>(initialValue);

  const handleToggle = useCallback((newToggleState?: ToggleState) => {
    if (typeof newToggleState === 'boolean') {
      setToggleState(newToggleState);
    } else {
      setToggleState((prevState) => !prevState);
    }
  }, []);

  return [toggleState, handleToggle];
};

export default useToggle;
