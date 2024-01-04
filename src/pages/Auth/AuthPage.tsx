import Header from "components/Header/Header";
import Title from "components/Title/Title";
import React, { useEffect, useState } from "react";
import Button from "ui/Button/Button";
import userIcon from "assets/icons/login-user-icon.png";
import emailIcon from "assets/icons/email-icon.svg";
import Modal from "components/Modal/Modal";
import Form, { TFieldsForm } from "components/Forms/LoginForm";
import SocialButtons from "general/SocialButtons";
import LoginForm from "components/Forms/LoginForm";
import RegistrationForm from "components/Forms/RegisterForm";

export default function AuthPage(): JSX.Element {
  const [choosedForm, setchoosedForm] = useState("");

  const handleForm = () => {
    setchoosedForm('email')
  };

  const toggleBackdrop = (event: React.MouseEvent | React.KeyboardEvent) => {
    if ("key" in event && event.key === "Escape") {
      setchoosedForm("");
    }

    if ("target" in event) {
      const { dataset } = event.target as HTMLButtonElement;
      if (dataset.backdrop === "false") {
        setchoosedForm("");
      }
    }
  };

  useEffect(() => {
    console.log(choosedForm);
  }, [choosedForm]);

  return (
    <>
      <Header>
        <Title style="login_page-title" h={1}>
          Login to Continue
        </Title>
      </Header>
      <section className="login_page-section">
        <div className="login_welcome-container">
          <div className="login_welcome-image">
            <div className="login_welcome-image__container">
              <img src={userIcon} alt="Welcome user image" />
            </div>
            <p className="login_welcome-title">Please Login</p>
          </div>
          <p className="login_welcome-text">
            You can use your email or continue with one of your social accounts.
          </p>
          <Button
            id="button-email-login-page"
            type="button"
            func={() => setchoosedForm("email")}
            style="login_email-button-open-form"
          >
            <img src={emailIcon} alt="Email icon" />
            <p>Continue with Email</p>
          </Button>
          <SocialButtons />
          <p style={{ textAlign: "center", marginBottom: "8px" }}>
            Don’t have an account yet?
          </p>
          <p
            onClick={() => setchoosedForm("registration")}
            style={{
              textAlign: "center",
              textDecoration: "underline",
              color: "blue",
            }}
          >
            Create an account
          </p>
        </div>
      </section>
      {choosedForm === "email" && (
        <Modal toggleFunc={toggleBackdrop}>
          <LoginForm
            titleText="Welcome to MaBook"
            buttonText="Login"
            style="login_form"
            handleForm={handleForm}
          />
        </Modal>
      )}
      {choosedForm === "registration" && (
        <Modal toggleFunc={toggleBackdrop}>
          <RegistrationForm
            titleText="Welcome to MaBook"
            buttonText="Register"
            style="register_form"
            handleForm={handleForm}

          />
        </Modal>
      )}
    </>
  );
}
