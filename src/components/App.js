import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';
import React from "react";

function App() {
  //Обработчк открытия Popup для редактирования аватара
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  //Обработчк открытия Popup для редактирования профиля
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  //Обработчик открытия Popup для добавлеия нового места
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }
  //Обработчик закрытия всех Popup
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard("");
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("")
  
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }


  return (
    <div className="root">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} handleCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} isClose={!isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="card" title="Новое место" isOpen={isAddPlacePopupOpen} isClose={!isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} isClose={!isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </div>
  );
}

export default App;
