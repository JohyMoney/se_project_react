import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const ownItems = clothingItems.filter((item) => {
    const ownerId =
      typeof item.owner === "string" ? item.owner : item.owner?._id;
    return ownerId === currentUser?._id;
  });

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          className="clothes-section__button"
          onClick={onAddClick}
        >
          + Add New
        </button>
      </div>
      <ul className="cards__list">
        {ownItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
