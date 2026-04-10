import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard.jsx";

export default function ClothesSection({ clothingItems, onCardClick, onAddClick }) {
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
          {clothingItems
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
              />
            ))}
      </ul>
    </div>
  );
}