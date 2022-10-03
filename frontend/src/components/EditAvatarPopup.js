import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar, onClose }) {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({ avatar: inputRef.current.value });
  }

  return (
    <PopupWithForm
      title="Change profile picture"
      name="avatar"
      isOpen={isOpen}
      buttonText="Save"
      onSubmit={handleSubmit}
      onClose={onClose}
    >
      <input
        className="form__info-input"
        required
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Enter image url"
        ref={inputRef}
      />
      <span id="avatar-error"></span>
    </PopupWithForm>
  );
}
