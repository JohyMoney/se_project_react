<<<<<<< HEAD
import { useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const initialValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const { values, handleChange, setValues } = useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues);
    }
  }, [isOpen, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values) .catch(console.error);
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      buttonText="Log in"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      secondaryButtonText="or Sign up"
      onSecondaryAction={onSwitchToRegister}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
=======
import { useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

const initialValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, onLogin, onSwitchToRegister }) {
  const { values, handleChange, setValues } = useForm(initialValues);

  useEffect(() => {
    if (isOpen) {
      setValues(initialValues);
    }
  }, [isOpen, setValues]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onLogin(values) .catch(console.error);
  };

  return (
    <ModalWithForm
      onSubmit={handleSubmit}
      buttonText="Log in"
      title="Log in"
      isOpen={isOpen}
      onClose={onClose}
      secondaryButtonText="or Sign up"
      onSecondaryAction={onSwitchToRegister}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="login-email"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
          value={values.email}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="login-password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          onChange={handleChange}
          value={values.password}
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
>>>>>>> 583d20bafe86b377c2ad36fe6cfe4c459bc565e2
