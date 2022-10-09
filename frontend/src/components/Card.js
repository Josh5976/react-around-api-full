import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  function handleClick() {
    onCardClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onDeleteClick(card);
  }

  const currentUser = React.useContext(CurrentUserContext);
  const [userInfo, setUserInfo] = React.useState({});
  React.useEffect(() => {
    setUserInfo({
    _id: currentUser._id
    })
  }, [currentUser]);

  const isLiked = card.likes.some((userId) => userId === currentUser._id);
  const cardLikeButtonClass = `card__info-button ${
    isLiked && "card__info-button_active"
  }`;

  const isOwn = card.owner === userInfo._id;
  const cardDeleteButtonClass = `card__trash ${isOwn && "card__trash_enabled"}`;

  return (
    <div className="card">
      <button
        className={cardDeleteButtonClass}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <img className="card__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="card__info">
        <h2 className="card__info-title">{card.name}</h2>
        <div className="card__info-container">
          <button
            className={cardLikeButtonClass}
            onClick={handleCardLike}
            type="button"
          ></button>
          <h3 className="card__info-likes">{card.likes.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default Card;
