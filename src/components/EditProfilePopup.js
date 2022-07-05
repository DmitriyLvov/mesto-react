import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [formValues, setFormValues] = useState({ name: '', about: '' });
  const currentUser = useContext(CurrentUserContext);
  //Установка данных пользователя по умолчанию
  useEffect(() => {
    const { name, about } = currentUser;
    setFormValues({ name, about });
  }, [currentUser, isOpen]);

  //Обработка инпутов
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  //Подтверждение сохранения картинки
  const handleSubmit = (e) => {
    //Отмена стандартной отправки формы
    e.preventDefault();
    onUpdateUser(formValues);
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
        name='name'
        value={formValues.name}
        onChange={handleChangeInput}
        className='popup__text-input popup__text-input_order_first popup__text-input_type_author'
        type='text'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__error popup__error_type_author popup__error_order_first' />
      <input
        id='description'
        name='about'
        value={formValues.about}
        onChange={handleChangeInput}
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
