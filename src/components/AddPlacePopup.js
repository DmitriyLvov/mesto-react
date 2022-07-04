import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [formValues, setFormValues] = useState({ name: '', link: '' });
  //Обработка инпутов
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };
  //Подтверждение сохранения картинки
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();
    onAddPlace(formValues);
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
        name='name'
        className='popup__text-input popup__text-input_order_first popup__text-input_type_picture-name'
        type='text'
        placeholder='Название'
        onChange={handleChangeInput}
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__error popup__error_type_name popup__error_order_first' />
      <input
        id='path'
        name='link'
        className='popup__text-input popup__text-input_order_next popup__text-input_type_picture-path'
        onChange={handleChangeInput}
        type='url'
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__error popup__error_type_path popup__error_order_second' />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
