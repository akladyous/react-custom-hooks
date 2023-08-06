import React, { useState } from 'react';
import { useLockBody } from './useLockBody';

export default function DemoUseLockBody() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      {modalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}

function Modal({ onClose }: { onClose: () => void }) {
  useLockBody();

  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>This is a modal content.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </div>
  );
}
