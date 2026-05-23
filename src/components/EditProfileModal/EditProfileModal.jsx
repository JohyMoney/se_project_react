import { useContext, useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const initialValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({ isOpen, onClose, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: currentUser?.name ?? "",
        avatar: currentUser?.avatar ?? "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateProfile(values).catch(console.error);
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      buttonText="Save changes"
      title="Change profile data"
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="edit-name"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="edit-avatar"
          name="avatar"
          placeholder="Avatar URL"
          required
          onChange={handleChange}
          value={values.avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
