import React from 'react';
import { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, handleCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);
  const { getAuthorInfo, getCards } = api;

  useEffect(() => {
    Promise.all([getAuthorInfo(), getCards()])
      .then(([userInfo, cards]) => {
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(cards);
      })
      .catch((err) => {
        console.log(`Ошибка запроса стартовой информации: ${err}`);
      });
  }, []);

  return (
    <main>
      <section>
        <div className='profile'>
          <div className='avatar' onClick={onEditAvatar}>
            <img className='avatar__image' src={userAvatar} alt='Аватар' />
            <div className='avatar__layout'></div>
          </div>
          <div className='profile__info'>
            <div className='profile__author-panel'>
              <h1 className='profile__text-field profile__text-field_type_author'>
                {userName}
              </h1>
              <button
                type='button'
                className='profile__edit-button'
                onClick={onEditProfile}></button>
            </div>
            <p className='profile__text-field profile__text-field_type_description'>
              {userDescription}
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
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
