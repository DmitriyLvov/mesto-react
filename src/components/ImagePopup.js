import React from "react";

function ImagePopup(props) {
    const card = props.card;
    return (
        <>
            {card && <div className="popup popup_type_image popup_opened">
                <div className="popup__container popup__container_type_image">
                    <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                    <img className="popup__image" src={card.link} alt={card.name} />
                    <p className="popup__description">{card.name}</p>
                </div>
            </div>}
        </>)
}

export default ImagePopup;