import "./ItemCard.css"

function ItemCard({ item, onCardClick }) {
const handlecardclick = () => {
  onCardClick(item)
}

    return   <li className="card" onClick={handlecardclick}>
      <h2 className="card__name">{item.name}</h2>
      <img
      onClick={(handlecardclick)}
      className="card__image" src={item.image} alt={item.name} />
      
    </li>
}

export default ItemCard