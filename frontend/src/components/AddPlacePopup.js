import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onAddPlaceSubmit, onClose }) {
  const titleRef = React.useRef();
  const linkRef = React.useRef();

  React.useEffect(() => {
    titleRef.current.value = "";
    linkRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: titleRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="New Place"
      name="post"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Create"
      onClose={onClose}
    >
      <input
        className="form__info-input form__info-input_type_title"
        required
        type="text"
        id="title"
        name="name"
        placeholder="Title"
        minLength="1"
        maxLength="30"
        ref={titleRef}
      />
      <span id="title-error"></span>
      <input
        className="form__info-input form__info-input_type_image"
        required
        type="url"
        id="image"
        name="link"
        placeholder="Image Link"
        ref={linkRef}
      />
      <span id="image-error"></span>
    </PopupWithForm>
  );
}
