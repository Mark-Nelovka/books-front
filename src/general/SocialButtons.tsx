import React from "react";
import Button from "ui/Button/Button";
import appleIcon from "assets/icons/apple-logo-icon.svg";
import facebookIcon from "assets/icons/facebook-logo-icon.svg";
import googleIcon from "assets/icons/google-logo-icon.svg";

export default function SocialButtons() {
  const handleSomeFunc = () => {};

  return (
    <>
      <hr style={{ marginBottom: "24px", marginTop: "24px" }} />
      <Button
        id="button-apple-login-page"
        type="button"
        func={handleSomeFunc}
        style="button-social-login-page"
      >
        <img src={appleIcon} alt="Apple icon" />
        <p>Sign in with Apple</p>
      </Button>
      <Button
        id="button-facebook-login-page"
        type="button"
        func={handleSomeFunc}
        style="button-social-login-page"
      >
        <img src={facebookIcon} alt="Facebook icon" />
        <p>Sign in with Facebook</p>
      </Button>
      <Button
        id="button-google-login-page"
        type="button"
        func={handleSomeFunc}
        style="button-social-login-page"
      >
        <img src={googleIcon} alt="Google icon" />
        <p>Sign in with Google</p>
      </Button>
    </>
  );
}
