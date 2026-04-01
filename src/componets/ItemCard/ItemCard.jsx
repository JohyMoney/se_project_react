import "./ItemCard.css"

function ItemCard({ item }) {
    return   <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.image} alt={item.name} />
      
    </li>
}

export default ItemCard