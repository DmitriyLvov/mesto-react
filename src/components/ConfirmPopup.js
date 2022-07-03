import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm();
  };
  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Да'
    />
  );
}

export default ConfirmPopup;
