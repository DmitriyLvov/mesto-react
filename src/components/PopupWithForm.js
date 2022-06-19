import React from "react";

function PopupWithForm(props) {
    const title = props.title;
    const name = props.name;
    //const children = props.children;
    const isOpen = props.isOpen;
    const isClose = props.isClose;
    let classStyle;
    if (isOpen) {
        classStyle = `popup popup_type_${name} popup_opened`;
    }
    if (isClose) {
        classStyle = `popup popup_type_${name}`;
    }

    return (
        <div className={classStyle}>
            <form name={`${name}-form`} className={`popup__container popup__container_type_form`} noValidate>
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <button type="submit" className="popup__submit-button popup__submit-button_type_confirm">Да</button>
            </form>
        </div>)
}

export default PopupWithForm;