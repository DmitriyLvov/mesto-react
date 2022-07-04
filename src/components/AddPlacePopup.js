import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log({ name, link });
    onAddPlace({ name, link });
  };
  return (
    <PopupWithForm
      name='card'
      title='Новое место'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText='Добавить'
      buttonTextOnLoading='Добавление'
      isLoading={isLoading}>
      <input
        id='name'
        className='popup__text-input popup__text-input_order_first popup__text-input_type_picture-name'
        type='text'
        placeholder='Название'
        onChange={(e) => setName(e.target.value)}
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__error popup__error_type_name popup__error_order_first' />
      <input
        id='path'
        className='popup__text-input popup__text-input_order_next popup__text-input_type_picture-path'
        onChange={(e) => setLink(e.target.value)}
        type='url'
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__error popup__error_type_path popup__error_order_second' />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
