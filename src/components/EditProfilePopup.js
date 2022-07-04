import React from 'react';
import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);
  //Установка данных пользователя по умолчанию
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  const handleSubmit = (e) => {
    //Отмена стандартной отправки формы
    e.preventDefault();
    onUpdateUser({ name, about: description });
  };

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      isClose={!isOpen}
      onClose={onClose}
      buttonText='Сохранить'
      buttonTextOnLoading='Сохранение'
      onSubmit={handleSubmit}
      isLoading={isLoading}>
      <input
        id='author'
        defaultValue={name}
        onChange={(e) => setName(e.target.value)}
        className='popup__text-input popup__text-input_order_first popup__text-input_type_author'
        type='text'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__error popup__error_type_author popup__error_order_first' />
      <input
        id='description'
        defaultValue={description}
        onChange={(e) => setDescription(e.target.value)}
        className='popup__text-input popup__text-input_order_next popup__text-input_type_description'
        type='text'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='popup__error popup__error_type_description popup__error_order_second' />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
