import React from "react";

function PopupWithForm({
  title,
  name,
  isOpen,
  buttonText,
  onClose,
  onSubmit,
  children,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_enabled" : ""}`}
    >
      <div className="popup__content popup__content_type_form">
        <button
          className="popup__content-close"
          type="button"
          onClick={onClose}
        ></button>
        <form className="form" name={name} onSubmit={onSubmit}>
          <h3 className="form__info-title">{title}</h3>
          {children}
          <button type="submit" className="form__info-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
