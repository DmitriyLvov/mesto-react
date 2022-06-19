import React from "react";

function Card(props) {
  const card = props.card;
  const handleCardClick = () => {
    //Открытие попапа для увеличения картинки
    props.handleCardClick(props.card);
  }
  return (
    <li className="elements__item">
      <img className="elements__image" src={card.link} alt={card.name} onClick={handleCardClick}/>
      <div className="elements__description">
        <p className="elements__title">{card.name}</p>
        <div>
          <button type="button" className="elements__like"></button>
          <p className="elements__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button type="button" className="elements__delete-button"></button>
    </li>
  )
}

export default Card;