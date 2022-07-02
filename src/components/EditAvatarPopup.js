import React from 'react';
import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarInput = useRef(null);
  //Сохраение аватара
  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar = avatarInput.current.value;
    onUpdateAvatar(avatar);
  };
  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Сохранить'
    >
      <input
        id='url'
        className='popup__text-input popup__text-input_order_first'
        type='url'
        placeholder='Ссылка на аватар'
        required
        ref={avatarInput}
      />
      <span className='popup__error popup__error_type_url popup__error_order_first' />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
