import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithFrom from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

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
    selectedCard = "";
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  let selectedCard;

  const hadnleCardClick = (card) => {
    selectedCard = card;
    console.log("s")
  }


  return (
    <div className="root">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} hadnleCardClick={hadnleCardClick} />
      <Footer />
      <PopupWithFrom name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} isClose={!isEditProfilePopupOpen} onClose={closeAllPopups} />
      <PopupWithFrom name="card" title="Новое место" isOpen={isAddPlacePopupOpen} isClose={!isAddPlacePopupOpen} onClose={closeAllPopups} />
      <PopupWithFrom name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} isClose={!isEditAvatarPopupOpen} onClose={closeAllPopups} />
      <ImagePopup card={selectedCard} />
    </div>
  );
}

export default App;
