import { useEffect, useMemo, useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, apiKey } from "../../utils/constants.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile.jsx";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
  updateUserProfile,
} from "../../utils/api.js";
import { checkToken, signin, signup } from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";

const TOKEN_STORAGE_KEY = "jwt";

const getLikeId = (like) => {
  if (typeof like === "string") {
    return like;
  }

  return like?._id ?? null;
};

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 0, C: 0 },
    city: "",
    isDay: true,
    condition: "Clear",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCardId, setSelectedCardId] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_STORAGE_KEY));
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentUnit) =>
      currentUnit === "F" ? "C" : "F",
    );
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCardId(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setActiveModal("add garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const onAddItem = (inputValues) => {
    if (!token) {
      setActiveModal("login");
      return Promise.reject(new Error("You must be logged in"));
    }

    return addItem(inputValues, token)
      .then((savedItem) => {
        setClothingItems((items) => [savedItem, ...items]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to add item:", error);
        throw error;
      });
  };

  const handleDeleteItem = (card) => {
    if (!token || card?._id == null) {
      return;
    }

    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
      });
  };

  const handleCardLike = (card) => {
    if (!token || !currentUser?._id || !card?._id) {
      setActiveModal("login");
      return;
    }

    const isLiked = (card?.likes ?? []).some(
      (like) => getLikeId(like) === currentUser._id,
    );
    const request = isLiked ? removeCardLike : addCardLike;

    request(card._id, token)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === updatedCard._id ? updatedCard : item)),
        );
      })
      .catch((error) => {
        console.error("Failed to update like status:", error);
      });
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((data) => {
        const jwt = data?.token;

        if (!jwt) {
          throw new Error("Authentication token is missing in sign-in response");
        }

        localStorage.setItem(TOKEN_STORAGE_KEY, jwt);
        setToken(jwt);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to sign in:", error);
        throw error;
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return signup({ name, avatar, email, password })
      .then(() => handleLogin({ email, password }))
      .catch((error) => {
        console.error("Failed to sign up:", error);
        throw error;
      });
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    if (!token) {
      return Promise.reject(new Error("You must be logged in"));
    }

    return updateUserProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        throw error;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setToken(null);
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => setWeatherData(filterWeatherData(data)))
      .catch((err) => {
        console.error("Weather fetch failed:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((err) => {
        console.error("Items fetch failed:", err);
      });
  }, []);

  useEffect(() => {
    if (!token) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser({
          ...user,
          avatar: user?.avatar ?? "",
          name: user?.name ?? "",
          email: user?.email ?? "",
        });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Failed to restore session:", error);
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        setToken(null);
        setIsLoggedIn(false);
      });
  }, [token]);

  const userContextValue = useMemo(() => currentUser, [currentUser]);

  return (
    <CurrentUserContext.Provider value={userContextValue}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={() => setActiveModal("edit-profile")}
                      onSignOut={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
        </div>

        <AddItemModal
          isOpen={activeModal === "add garment"}
          onAddItem={onAddItem}
          onClose={closeActiveModal}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCardId}
          onClose={closeActiveModal}
          onDelete={handleDeleteItem}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
          onSwitchToRegister={() => setActiveModal("register")}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
          onSwitchToLogin={() => setActiveModal("login")}
        />
        <EditProfileModal
          isOpen={activeModal === "edit-profile"}
          onClose={closeActiveModal}
          onUpdateProfile={handleUpdateProfile}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
