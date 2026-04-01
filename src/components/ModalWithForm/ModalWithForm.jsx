import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, isOpen, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <form className="modal__form">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} type="button">
            close
          </button>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
