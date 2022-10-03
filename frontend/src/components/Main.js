import React from "react";
import Card from "./Card";
import editAvatarButton from "../images/edit_profile_image.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  cards,
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onDeleteCardClick,
  onCardImageClick,
  onCardLikeClick,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const imageStyle = { backgroundImage: `url(${currentUser.avatar})` };

  return (
    <main className="page__content">
      <section className="profile">
        <div className="profile__avatar profile__avatar_container">
          <div
            style={imageStyle}
            className="profile__avatar-image"
            alt="profile image"
          />
          <div className="profile__avatar-overlay">
            <img
              src={editAvatarButton}
              className="profile__avatar-overlay-image"
              alt="edit avatar button"
              onClick={onEditAvatarClick}
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            className="profile__info-button"
            type="button"
            onClick={onEditProfileClick}
          ></button>
          <p className="profile__info-subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          onClick={onAddPlaceClick}
        ></button>
      </section>
      <section className="elements" id="elements">
        {cards.map((card, i) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardImageClick}
            onDeleteClick={onDeleteCardClick}
            onCardLike={onCardLikeClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
