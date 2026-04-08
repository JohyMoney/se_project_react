import "./ClothesSection.css";

export default function ClothesSection({ clothingItems, onCardClick }) {
    return (
       <div className="clothes-section">
        <div className="clothes-section__row"> 
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
           <p>text</p>
           <button className="clothes-section__button">Button</button>
        </div>
        </div>
    );
}