import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_preview ${card ? "popup_enabled" : ""}`}>
      <div className="popup__content popup__content_type_preview">
        <button
          type="button"
          className="popup__content-close popup__content-close_type_preview"
          onClick={onClose}
        ></button>
        <img
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
          className="popup__image"
        />
        <h3 className="popup__title">{card ? card.name : ""}</h3>
      </div>
    </div>
  );
}

export default ImagePopup;
