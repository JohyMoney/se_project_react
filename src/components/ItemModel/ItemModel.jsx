import "./ItemModel.css";

function ItemModal({ activeModal, card, onClose }) {
  const handleOverlayClick = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`item-modal ${activeModal === "preview" ? "item-modal_opened" : ""}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="item-modal__content">
        <button
          onClick={onClose}
          type="button"
          className="item-modal__close"
          aria-label="Close preview"
        >
          X
        </button>
        <img src={card?.link} alt={card?.name} className="item-modal__image" />
        <div className="item-modal__footer">
          <h2 className="item-modal__caption">{card?.name}</h2>
          <p className="item-modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
