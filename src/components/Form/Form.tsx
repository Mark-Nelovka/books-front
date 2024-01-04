import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hook";
import { registrationUser } from "store/auth/authOperations";
import Title from "components/Title/Title";
import Button from "ui/Button/Button";
import { Input } from "ui/FormFields/Fields";
import Header from "components/Header/Header";
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
  children: TFieldsForm[];
  style: string;
  buttonText: string;
}

interface IFormStateTodo {
  [key: string]: string;
  // email: string;
  // password: string;
  // name: string;
  // lastName: string;
}

export default function Form({
  titleText,
  children,
  style,
  buttonText
}: IPropsForm): JSX.Element {
  const [inputValue, setInputValue] = useState<IFormStateTodo>({
    email: "",
    password: "",
    name: "",
    lastName: "",
  });
  const [policy, setPolicy] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // useEffect(() => {

  // }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
        {children.map((el) => {
          return (
            <Input
              key={el.id}
              value={inputValue[el.name]}
              onChangeFunc={handleChangeInputValue}
              style="login_form-title-field"
              placeholder={el.placeholder}
              id={el.id}
              name={el.name}
              labelTitle={el.label}
            />
          );
        })}
      </form>
      <hr />
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
      <p style={{color: 'blue', textAlign: 'center'}}>Forgot password?</p>
    </>
  );
}
