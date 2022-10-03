import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onUpdateUser, onClose }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDesciptionChange(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Edit profile"
      name="edit"
      isOpen={isOpen}
      buttonText="Save"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="form__info-input form__info-input_type_name"
        required
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name}
      />
      <span id="name-error"></span>
      <input
        className="form__info-input form__info-input_type_job"
        required
        type="text"
        id="occupation"
        name="occupation"
        placeholder="Occupation"
        minLength="2"
        maxLength="200"
        onChange={handleDesciptionChange}
        value={description}
      />
      <span id="occupation-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
