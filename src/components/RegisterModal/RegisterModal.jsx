import { useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const initialValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onClose, onRegister, onSwitchToLogin }) {
  const { values, handleChange, setValues } = useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues);
    }
  }, [isOpen, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onRegister(values) .catch(console.error);
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      buttonText="Sign up"
      title="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      secondaryButtonText="or Log in"
      onSecondaryAction={onSwitchToLogin}
    >
      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="register-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="register-password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={handleChange}
          value={values.password}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="register-name"
          name="name"
          placeholder="Name"
          required
          minLength={2}
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="register-avatar"
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

export default RegisterModal;
