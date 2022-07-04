import React, { useEffect } from 'react';
import { popupClassStyle } from '../utils/utils';
import { FormValidator, validatorSettings } from '../utils/FormValidator';

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  children,
  buttonText,
  isLoading,
  buttonTextOnLoading,
  onSubmit,
}) {
  //Активация валидации для формы
  useEffect(() => {
    const validator = new FormValidator(validatorSettings, `${name}-form`);
    validator.enableValidation();
  }, []);
  //Проверка активной кнопки при открытии
  useEffect(() => {
    if (isOpen) {
      const validator = new FormValidator(validatorSettings, `${name}-form`);
      validator.toggleButtonState();
    }
  }, [isOpen]);

  return (
    <div className={popupClassStyle(name, isOpen)}>
      <form
        name={`${name}-form`}
        onSubmit={onSubmit}
        className={`popup__container popup__container_type_form`}>
        <button
          type='button'
          className='popup__close-button'
          onClick={onClose}></button>
        <h2 className='popup__title'>{title}</h2>
        {children}
        <button
          type='submit'
          className='popup__submit-button popup__submit-button_type_confirm'>
          {isLoading ? buttonTextOnLoading : buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
