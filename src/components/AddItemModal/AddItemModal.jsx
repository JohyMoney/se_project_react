
import {useForm} from "../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm"



    function handleSubmit(evt) {
        evt.preventDefault();
        onAdditem(values);
        const form = evt.target;
        const name = form.name.value;
        const imageUrl = form.imageUrl.value;
        const weatherType = form.weatherType.value;

        const onAdditem = (data) => {
            console.log("New item added:", data);
            closeActiveModal();
        };

        onAdditem({ name, imageUrl, weatherType });
    }
    

    return (
        <ModalWithForm
        onSubmit={onAdditem}
          buttonText="Add a garment"
          title="New garment"
          isOpen={isOpen}
          onClose={handleSubmit}
        >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            required
            onChange={handleChange}
            value={values.weatherType}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image URL
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            required
            onChange={handleChange}
            value={values.imageUrl}
          />
        </label>
      <ItemModal
        activeModal={activeModal}
        card={selectedCardId}
        onClose={closeActiveModal}
      />
  <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type</legend>
          <label htmlFor="hot" className="modal__label modal__input_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weather"
              value="hot"
              required
            />
            Hot
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__input_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weather"
              value="cold"
            />
            Cold
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__input_type_radio"
          >
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weather"
              value="warm"
            />
            Warm
          </label>
                </fieldset>
              </ModalWithForm>
            );
        };
        
        export default addItemModal;