import React from "react";
import successIcon from "../images/SuccessIcon.svg";
import errorIcon from "../images/ErrorIcon.svg";
import "../blocks/popup.css";

function InfoTooltip({ isOpen, onClose, status }) {
  return (
    <div className={`popup ${isOpen ? " popup_enabled" : ""}`}>
      <div className="popup__content popup__content_type_form">
        <button
          className="popup__content-close"
          type="button"
          onClick={onClose}
        ></button>
        {status === "success" ? (
          <div className="popup__content-wrapper">
            <img
              src={successIcon}
              alt="success icon"
              className="popup__icon"
            />
            <p className="popup__status-message">
              Success! You have now been registered.
            </p>
          </div>
        ) : (
          <div className="popup__content-wrapper">
            <img
              src={errorIcon}
              alt="error icon"
              className="popup__icon"
            />
            <p className="popup__status-message">
              Oops, somethings went wrong! Please try again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoTooltip;
