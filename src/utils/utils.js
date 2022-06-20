export const renderLoading = (popup, isLoading, text) => {
  if (isLoading) {
    popup._submitButton.textContent = text;
  } else {
    popup._submitButton.textContent = popup._originalSubmitText;
  }
};

export const popupClassStyle = (name, isOpen) => {
  if (isOpen) {
    return `popup popup_type_${name} popup_opened`;
  }
  return `popup popup_type_${name}`;
};
