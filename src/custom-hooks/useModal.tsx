import { useState, useCallback } from 'react';

export default function useModal(defaultState: boolean = false) {
  const [isVisible, setIsVisible] = useState<boolean>(defaultState);

  const openModal = useCallback(() => setIsVisible(true), []);
  const closeModal = useCallback(() => setIsVisible(false), []);

  return {
    isVisible,
    setIsVisible,
    openModal,
    closeModal,
  };
}
