import { useState, useCallback } from 'react';
// import type { Dispatch, SetStateAction } from 'react';

type UseModalType = {
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
};

export default function useModal(defaultState: boolean = false): UseModalType {
  const [isVisible, setIsVisible] = useState<boolean>(defaultState);

  const openModal = useCallback(() => setIsVisible(true), []);
  const closeModal = useCallback(() => setIsVisible(false), []);
  const toggleModal = useCallback(() => setIsVisible((prevState) => !prevState), []);

  return {
    isVisible,
    openModal,
    closeModal,
    toggleModal,
  };
}
