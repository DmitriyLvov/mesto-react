import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });

  //Обработчк открытия Popup для редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  //Обработчк открытия Popup для редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  //Обработчик открытия Popup для добавлеия нового места
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  //Обработчик закрытия всех Popup
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  return (
    <div className='root'>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        isClose={!isEditProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'>
        <input
          id='author'
          className='popup__text-input popup__text-input_order_first popup__text-input_type_author'
          type='text'
          minLength='2'
          maxLength='40'
          required
        />
        <span className='popup__error popup__error_type_author popup__error_order_first' />
        <input
          id='description'
          className='popup__text-input popup__text-input_order_next popup__text-input_type_description'
          type='text'
          minLength='2'
          maxLength='200'
          required
        />
        <span className='popup__error popup__error_type_description popup__error_order_second' />
      </PopupWithForm>
      <PopupWithForm
        name='card'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
        isClose={!isAddPlacePopupOpen}
        onClose={closeAllPopups}
        buttonText='Добавить'>
        <input
          id='name'
          className='popup__text-input popup__text-input_order_first popup__text-input_type_picture-name'
          type='text'
          placeholder='Название'
          minLength='2'
          maxLength='30'
          required
        />
        <span className='popup__error popup__error_type_name popup__error_order_first' />
        <input
          id='path'
          className='popup__text-input popup__text-input_order_next popup__text-input_type_picture-path'
          type='url'
          placeholder='Ссылка на картинку'
          required
        />
        <span className='popup__error popup__error_type_path popup__error_order_second' />
      </PopupWithForm>
      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        isClose={!isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText='Сохранить'>
        <input
          id='url'
          className='popup__text-input popup__text-input_order_first'
          type='url'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='popup__error popup__error_type_url popup__error_order_first' />
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        isClose={!isImagePopupOpen}
      />
    </div>
  );
}

export default App;
