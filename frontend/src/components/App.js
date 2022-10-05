import React from "react";
import { Route, useNavigate, Routes, Navigate } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
// import PopupWithForm from "./PopupWithForm";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsAvatarPopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipStatus, setInfoTooltipStatus] = React.useState("");

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");

  // const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token && isLoggedIn) {
      api
        .getUser(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards(token)
        .then((cardData) => {
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);
    

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          console.log(res)
          if (res) {
            setEmail(res.data.email);
            setIsLoggedIn(true);
            navigate("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userUpdate) {
    const token = localStorage.getItem("jwt");
    api
      .changeUser({
        userName: userUpdate.name,
        userOccupation: userUpdate.about,
      }, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatarUpdate) {
    const token = localStorage.getItem("jwt");
    api
      .changeAvatar(avatarUpdate, token)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    const token = localStorage.getItem("jwt");
    api
      .addCard(card, token)
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const token = localStorage.getItem("jwt");
    const isLiked = card.likes.some((likes) => likes._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id, token)
        .then((cardData) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? cardData : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(card._id, token)
        .then((cardData) => {
          setCards((cards) =>
            cards.map((item) => (item._id === card._id ? cardData : item))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    const token = localStorage.getItem("jwt");
    api
      .deleteCard(card._id, token)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false);
    // setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
  }

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setInfoTooltipStatus("success");
          navigate("/signin");
        } else {
          setInfoTooltipStatus("fail");
        }
      })
      .catch((err) => {
        setInfoTooltipStatus("fail");
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    console.log(email);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          setEmail(email);
          localStorage.setItem("jwt", res.token);
          navigate("/");
        } else {
          setInfoTooltipStatus("fail");
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setInfoTooltipStatus("fail");
        setIsInfoTooltipOpen(true);
      });
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onSignOut={onSignOut} email={email} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onDeleteCardClick={handleCardDelete}
                  onCardImageClick={handleCardClick}
                  onCardLikeClick={handleCardLike}
                />
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/signin" element={<Login onLogin={onLogin} />} />
          <Route
            path="/signup"
            element={<Register onRegister={onRegister} />}
          />
          <Route
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onClose={closeAllPopups}
        />

        {/* <PopupWithForm
                  title="Are you sure"
                  name="delete"
                  isOpen={isConfirmDeletePopupOpen}
                  buttonText="Yes"
                  onClose={closeAllPopups}
                  >
                  </PopupWithForm> */}

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={infoTooltipStatus}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
