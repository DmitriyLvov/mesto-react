function ImagePopup(props) {
    const card = props.card;



    return (
        <>
            {card && <div className="popup popup_type_image">
                <div className="popup__container popup__container_type_image">
                    <button type="button" className="popup__close-button"></button>
                    <img className="popup__image" src="/" alt="Картинка карточки" />
                    <p className="popup__description">Test</p>
                </div>
            </div>}
        </>)
}

export default ImagePopup;