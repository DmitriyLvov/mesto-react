import React from 'react';
import { useEffect, useState, useContext } from 'react';
import api from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, handleCardClick }) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const { getCards, addLike, removeLike, removeCard } = api;

  useEffect(() => {
    Promise.all([getCards()])
      .then(([cards]) => {
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка запроса стартовой информации: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
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
  }

  function handleCardDelete(card) {
    removeCard(card._id)
      .then(() =>
        setCards((prevState) => prevState.filter((c) => c._id !== card._id))
      )
      .catch((er) => console.log('Ошибка удаления карточки: ', er));
  }

  return (
    <main>
      <section>
        <div className='profile'>
          <div className='avatar' onClick={onEditAvatar}>
            <img
              className='avatar__image'
              src={currentUser.avatar}
              alt='Аватар'
            />
            <div className='avatar__layout'></div>
          </div>
          <div className='profile__info'>
            <div className='profile__author-panel'>
              <h1 className='profile__text-field profile__text-field_type_author'>
                {currentUser.name}
              </h1>
              <button
                type='button'
                className='profile__edit-button'
                onClick={onEditProfile}></button>
            </div>
            <p className='profile__text-field profile__text-field_type_description'>
              {currentUser.about}
            </p>
          </div>
          <button
            type='button'
            className='profile__add-button'
            onClick={onAddPlace}></button>
        </div>
        <ul className='elements'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
