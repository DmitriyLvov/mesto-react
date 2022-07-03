import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import React from 'react';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const {
    getAuthorInfo,
    setUserInfo,
    setAvatar,
    getCards,
    addLike,
    removeLike,
    removeCard,
    addNewCard,
  } = api;
  useEffect(() => {
    Promise.all([getCards(), getAuthorInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser({ ...userInfo });
      })
      .catch((err) => {
        console.log(`Ошибка запроса стартовой информации: ${err}`);
      });
  }, []);

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
    setIsConfirmPopupOpen(false);
    setSelectedCard({ name: '', link: '', id: '' });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  //Перезаписываем данные пользователя из ответа сервера
  const updataUserData = (res) => {
    setCurrentUser({ ...res });
    closeAllPopups();
  };

  //Обновление данных пользователя
  const handleUpdateUser = (userInfo) => {
    setUserInfo(userInfo)
      .then((res) => {
        updataUserData(res);
      })
      .catch((er) => console.log(`Ошибка обновления данных пользователя`, er));
  };

  //Обновление аватара
  const handleUpdateAvatar = (avatar) => {
    setAvatar(avatar)
      .then((res) => {
        updataUserData(res);
      })
      .catch((er) => console.log('Ошика обновления аватара', er));
  };

  const handleCardLike = (card) => {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? removeLike(card._id)
          .then((newCard) =>
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            )
          )
          .catch((er) => console.log('Ошибка удаления лайка: ', er))
      : addLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((er) => console.log('Ошибка добавления лайка: ', er));
  };

  const handleCardDelete = () => {
    removeCard(selectedCard._id)
      .then(() => {
        setCards((prevState) =>
          prevState.filter((c) => c._id !== selectedCard._id)
        );
        closeAllPopups();
      })
      .catch((er) => console.log('Ошибка удаления карточки: ', er));
  };

  const handleCardDeleteWithConfirm = (card) => {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  };

  const handleAddPlace = (data) => {
    addNewCard(data)
      .then((res) => {
        setCards((prevState) => [res, ...prevState]);
        closeAllPopups();
      })
      .catch((er) => console.log('Ошибка добавления нового места', er));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteWithConfirm}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
