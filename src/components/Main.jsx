import React from "react";
import { useEffect, useState } from 'react';
import api from '../utils/Api';
import Card from './Card';

function Main(props) {
  const [userName, setUserName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [userAvatar, setUserAvatar] = useState();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getAuthorInfo(), api.getCards()])
      .then(results => {
        const userInfo = results[0];
        setUserName(userInfo.name);
        setUserDescription(userInfo.about);
        setUserAvatar(userInfo.avatar);
        setCards(results[1])
      })
  }, [])


  return (<main>
    <section>
      <div className="profile">
        <div className="avatar" onClick={props.onEditAvatar}>
          <img className="avatar__image" src={userAvatar} alt="Аватар" />
          <div className="avatar__layout"></div>
        </div>
        <div className="profile__info">
          <div className="profile__author-panel">
            <h1 className="profile__text-field profile__text-field_type_author">{userName}</h1>
            <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__text-field profile__text-field_type_description">{userDescription}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </div>
      <ul className="elements">
        {cards.map((card) => <Card key={card._id} card={card} handleCardClick={props.handleCardClick} />)}
      </ul>
    </section>
  </main>)
}

export default Main;