import "./ItemModel.css";


function ItemModal({ activeModal, card, onClose }) {
    return (
        <div className={`item-modal ${activeModal === "preview" && "item-modal_opened"}`}>
            <div className="modal__content">
             <button
             onClick={onClose}
             type="button"
              className="modal__close">
                close
                </button>
                <img src={card.link} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__caption">{card.name}</h2>
                    <p className="modal__weather">weather: {card.weather}</p>
                </div>
            </div>
            <h2 className="item-modal__title">{card.name}</h2>
            <p className="item-modal__description">{card.description}</p>

        </div>
    );
}

export default ItemModal;