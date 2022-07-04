import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import Spinner from './Spinner';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getCards(), api.getAuthorInfo()])
      .then(([cards, userInfo]) => {
        setCards(cards);
        setCurrentUser({ ...userInfo });
        setIsLoading(false);
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
    setIsLoading(false);
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
    setIsLoading(true);
    api
      .setUserInfo(userInfo)
      .then((res) => {
        updataUserData(res);
      })
      .catch((er) => console.log(`Ошибка обновления данных пользователя`, er));
  };

  //Обновление аватара
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        updataUserData(res);
      })
      .catch((er) => console.log('Ошика обновления аватара', er));
  };

  const handleCardLike = (card) => {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    isLiked
      ? api
          .removeLike(card._id)
          .then((newCard) =>
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            )
          )
          .catch((er) => console.log('Ошибка удаления лайка: ', er))
      : api
          .addLike(card._id)
          .then((newCard) => {
            setCards((state) =>
              state.map((c) => (c._id === card._id ? newCard : c))
            );
          })
          .catch((er) => console.log('Ошибка добавления лайка: ', er));
  };

  const handleCardDelete = () => {
    setIsLoading(true);
    api
      .removeCard(selectedCard._id)
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
    setIsLoading(true);
    api
      .addNewCard(data)
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
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
        />
        <Spinner isLoading={isLoading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
