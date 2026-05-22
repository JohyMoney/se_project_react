import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

const getLikeId = (like) => {
  if (typeof like === "string") {
    return like;
  }

  return like?._id ?? null;
};

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser?._id);
  const isLiked = (item.likes ?? []).some(
    (id) => getLikeId(id) === currentUser?._id,
  );

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (evt) => {
    evt.stopPropagation();
    onCardLike(item);
  };

  return (
    <li className="card" onClick={handleCardClick}>
      <div className="card__top-row">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            type="button"
            className={`card__like-btn ${isLiked ? "card__like-btn_liked" : ""}`}
            onClick={handleLike}
            aria-label="Like item"
          >
            Like
          </button>
        )}
      </div>
      <p className="card__like-count">{item.likes?.length ?? 0}</p>
      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
