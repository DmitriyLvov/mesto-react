import React from 'react';
import { popupClassStyle } from '../utils/utils';

function PopupWithForm({
  title,
  name,
  isOpen,
  isClose,
  onClose,
  children,
  buttonText,
}) {
  return (
    <div className={popupClassStyle(name, isOpen)}>
      <form
        name={`${name}-form`}
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
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
