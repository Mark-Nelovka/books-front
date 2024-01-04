import Header from "components/Header/Header";
import Title from "components/Title/Title";
import React, { useEffect, useState } from "react";
import Button from "ui/Button/Button";
import userIcon from "assets/icons/login-user-icon.png";
import emailIcon from "assets/icons/email-icon.svg";
import appleIcon from "assets/icons/apple-logo-icon.svg";
import facebookIcon from "assets/icons/facebook-logo-icon.svg";
import googleIcon from "assets/icons/google-logo-icon.svg";
import Modal from "components/Modal/Modal";
import Form, { TFieldsForm } from "components/Form/Form";

const fields: TFieldsForm[] = [
  {
    id: "email",
    name: "email",
    label: "Email",
    placeholder: "example@gmail.com",
    value: "",
  },
  {
    id: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
    value: "",
  },
//   { id: "name", name: "name", label: "Name", placeholder: "Name", value: "" },
//   {
//     id: "lastName",
//     name: "lastName",
//     label: "Last Name",
//     placeholder: "Last name",
//     value: "",
//   },
];

export default function LoginPage(): JSX.Element {
  const [choosedForm, setchoosedForm] = useState("");

  const handleForm = () => {
    console.log("first")
    setchoosedForm("email");
  };

  const toggleBackdrop = (event: React.MouseEvent | React.KeyboardEvent) => {
    if ('key' in event && event.key === "Escape") {
        setchoosedForm("");
      }
    
      if ('target' in event) {
        const { dataset } = event.target as HTMLButtonElement;
        if (dataset.backdrop === 'false') {
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
          <hr style={{ marginBottom: "24px" }} />
          <Button
            id="button-apple-login-page"
            type="button"
            func={handleForm}
            style="button-social-login-page"
          >
            <img src={appleIcon} alt="Apple icon" />
            <p>Sign in with Apple</p>
          </Button>
          <Button
            id="button-facebook-login-page"
            type="button"
            func={handleForm}
            style="button-social-login-page"
          >
            <img src={facebookIcon} alt="Facebook icon" />
            <p>Sign in with Facebook</p>
          </Button>
          <Button
            id="button-google-login-page"
            type="button"
            func={handleForm}
            style="button-social-login-page"
          >
            <img src={googleIcon} alt="Google icon" />
            <p>Sign in with Google</p>
          </Button>
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
          <Form titleText="Welcome to MaBook" buttonText="Login" style="login_form">
            {fields}
          </Form>
        </Modal>
      )}
      {/* {choosedForm === 'registration' && <Modal toggleFunc={toggleBackdrop} />} */}
    </>
  );
}
{
  /* <Input
value={inputValue.email}
onChangeFunc={handleChangeInputValue}
style="form__title-field"
placeholder="example@gmail.com"
id="Title"
name="title"
labelTitle="Title"
/> */
}
// <Input
// value={inputValue.password}
// onChangeFunc={handleChangeInputValue}
// style="form__title-field"
// placeholder="password"
// id="Title"
// name="title"
// labelTitle="Title"
// />
// <Input
// value={inputValue.name}
// onChangeFunc={handleChangeInputValue}
// style="form__title-field"
// placeholder="Name"
// id="Title"
// name="title"
// labelTitle="Title"
// />
// <Input
// value={inputValue.lastName}
// onChangeFunc={handleChangeInputValue}
// style="form__title-field"
// placeholder="Last name"
// id="Title"
// name="title"
// labelTitle="Title"
// />
{
  /* <div className="form__button-container">
<Button
id="form-submit-button"
style=""
func={handleSubmit}
type="submit"
>
Login
</Button>
</div>  */
}
