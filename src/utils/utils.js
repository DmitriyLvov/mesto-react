export const popupClassStyle = (name, isOpen) => {
  if (isOpen) {
    return `popup popup_type_${name} popup_opened`;
  }
  return `popup popup_type_${name}`;
};
