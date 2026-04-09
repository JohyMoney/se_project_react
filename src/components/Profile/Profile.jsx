import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../Sidebar/Sidebar";
import "./profile.css";


export default function Profile({ clothingItems, onCardClick, onAddClick }) {
  return (
    <section className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddClick={onAddClick}
      />
    </section>
  );
}