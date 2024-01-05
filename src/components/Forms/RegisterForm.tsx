import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { registrationUser, resetError } from "store/auth/authOperations";
import Title from "components/Title/Title";
import Button from "ui/Button/Button";
import { Input } from "ui/FormFields/Fields";
import Header from "components/Header/Header";
import SocialButtons from "general/SocialButtons";
import Notiflix from "notiflix";
import { useNavigate, useNavigation } from "react-router-dom";
// import { TTodoPayload } from "redux/todos/types";

export type TFieldsForm = {
  value: string;
  placeholder: string;
  id: string;
  name: string;
  label: string;
};

interface IPropsForm {
  titleText: string;
  style: string;
  buttonText: string;
  handleForm: (str: string) => void;
}

export interface IRegisterFormState {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export default function RegistrationForm({
  titleText,
  style,
  buttonText,
  handleForm,
}: IPropsForm): JSX.Element {
  const [inputValue, setInputValue] = useState<IRegisterFormState>({
    email: "",
    password: "",
    name: "",
    lastName: "",
  });
  const [policy, setPolicy] = useState<boolean>(false);
  const errorState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showErrorMessage = useCallback(() => {
    console.log("callShowErrorMessage");

    if (errorState.error.status) {
      Notiflix.Notify.warning(`${errorState.error.message}`);
      dispatch(resetError());
    }

    if (errorState.token) {
      navigate("/home");
    }
  }, [errorState.error.status, errorState.token]);

  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(Object.values(inputValue).filter((el) => el));
    if (Object.values(inputValue).filter((el) => el).length !== 4 || !policy)
      return;
    dispatch(registrationUser(inputValue));
  };

  const handleChangeInputValue = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePolicyChange = () => {
    setPolicy(!policy);
  };

  return (
    <>
      <Title style="login_form-title" h={2}>
        {titleText}
      </Title>
      <form className={style} onSubmit={handleSubmit}>
        <Input
          value={inputValue.email}
          onChangeFunc={handleChangeInputValue}
          style="login_form-title-field"
          placeholder="example@gmail.com"
          id="email"
          name="email"
          labelTitle="Email"
        />
        <Input
          value={inputValue.password}
          onChangeFunc={handleChangeInputValue}
          style="login_form-title-field"
          placeholder="password"
          id="password"
          name="password"
          labelTitle="Password"
        />
        <Input
          value={inputValue.name}
          onChangeFunc={handleChangeInputValue}
          style="login_form-title-field"
          placeholder="Name"
          id="name"
          name="name"
          labelTitle="Name"
        />
        <Input
          value={inputValue.lastName}
          onChangeFunc={handleChangeInputValue}
          style="login_form-title-field"
          placeholder="Last name"
          id="lastName"
          name="lastName"
          labelTitle="Last name"
        />
      </form>
      <div className="reg_policy-container" onClick={() => setPolicy(!policy)}>
        <input id="policy" type="checkbox" checked={policy} />
        <label htmlFor="policy">I agree to Terms of Use & Privacy Policy</label>
      </div>
      <div className="form__button-container">
        <Button
          id="form-submit-button"
          style="login_form-button"
          func={handleSubmit}
          type="submit"
          disabled={!policy}
        >
          {buttonText}
        </Button>
      </div>
      <SocialButtons />
      <p style={{ textAlign: "center", marginBottom: "8px" }}>
        Already have an account?
      </p>
      <p
        onClick={() => handleForm("login")}
        style={{
          textAlign: "center",
          textDecoration: "underline",
          color: "blue",
        }}
      >
        Login
      </p>
    </>
  );
}
