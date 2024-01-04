import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { registrationUser, resetError, signInUser } from "store/auth/authOperations";
import Title from "components/Title/Title";
import Button from "ui/Button/Button";
import { Input } from "ui/FormFields/Fields";
import Notiflix from "notiflix";
import { useNavigate } from "react-router-dom";

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
  handleForm: () => void;
}

export interface ILoginFormState {
  email: string;
  password: string;
}

export default function LoginForm({
  titleText,
  style,
  buttonText,
  handleForm
}: IPropsForm): JSX.Element {
  const [inputValue, setInputValue] = useState<ILoginFormState>({
    email: "",
    password: "",
  });
  const errorState = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const showErrorMessage = useCallback(() => {
    console.log("callShowErrorMessage");
  
    if (errorState.error.status) {
      Notiflix.Notify.warning(`${errorState.error.message}`);
      dispatch(resetError())
    }
  
    if (errorState.token) {
      navigate('/home');
    }
  }, [errorState.error.status, errorState.token]);
  
  useEffect(() => {
    showErrorMessage();
  }, [showErrorMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(Object.values(inputValue).filter(el => el))
    if(Object.values(inputValue).filter(el => el).length !== 2) return
    dispatch(signInUser(inputValue));
  };

  const handleChangeInputValue = (event: React.ChangeEvent) => {
    const { value, name } = event.target as HTMLInputElement;
    setInputValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      </form>
      <hr style={{marginBottom: '16px'}} />
      <div className="form__button-container">
        <Button
          id="form-submit-button"
          style="login_form-button"
          func={handleSubmit}
          type="submit"
        >
          {buttonText}
        </Button>
      </div>
      <p style={{ color: "blue", 
      textAlign: "center",
      marginTop: '12px'
      }}>Forgot password?</p>
    </>
  );
}
