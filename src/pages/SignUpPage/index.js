import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {isAuthenticated, signOut, signUp} from "../../auth/auth";
import Divider from "../../components/Divider";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import Checkbox from "../../components/Checkbox";

import classNames from "classnames";
import styles from "./signUpPage.module.css";
import signInStyles from "../SignInPage/signInPage.module.css";
import Card from "../../components/Card";

let initialErrorState = {
  errorMessage: "",
  isEmailInvalid: false,
  isPasswordInvalid: false,
  isConfirmPasswordInvalid: false,
  isAcceptTermsAndConditionsInvalid: false,
};

function SignUpPage({history}) {
  let [error, setError] = useState(initialErrorState);

  useEffect(() => {
    if (isAuthenticated()) signOut();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setError(initialErrorState);

    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;
    const acceptTermsAndConditions =
      event.target.acceptTermsAndConditions.checked;

    if (!password || !email) {
      setError({
        errorMessage: "Email and password are required!",
        isEmailInvalid: !email,
        isPasswordInvalid: !password,
        isConfirmPasswordInvalid: !confirmPassword,
        isAcceptTermsAndConditionsInvalid: !acceptTermsAndConditions,
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError({
        errorMessage: "Invalid email!",
        isEmailInvalid: true,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: false,
        isAcceptTermsAndConditionsInvalid: false,
      });
      return;
    }

    if (password !== confirmPassword) {
      setError({
        errorMessage: "The password confirmation does not match!",
        isEmailInvalid: false,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: true,
        isAcceptTermsAndConditionsInvalid: false,
      });
      return;
    }

    if (!acceptTermsAndConditions) {
      setError({
        errorMessage: "You must accept Terms and Conditions!",
        isEmailInvalid: false,
        isPasswordInvalid: false,
        isConfirmPasswordInvalid: false,
        isAcceptTermsAndConditionsInvalid: true,
      });
      return;
    }

    signUp({password, email})
      .then(() => {
        history.replace("/");
      })
      .catch(err => {
        console.warn("Sign Up failed:", err);
        setError({
          errorMessage: "Sign In failed!",
          isEmailInvalid: false,
          isPasswordInvalid: false,
          isConfirmPasswordInvalid: false,
        });
      });
  }

  return (
    <div className={signInStyles.Wrapper}>
      <Card title="Create an account">
        <form className={signInStyles.Form} onSubmit={handleSubmit}>
          <TextInput
            name="email"
            label="Your Email"
            placeholder="Your Email"
            isRequired
            error={error.isEmailInvalid}
          />
          <TextInput
            type="password"
            name="password"
            label="Password"
            placeholder="Password"
            isRequired
            error={error.isPasswordInvalid}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            isRequired
            error={error.isConfirmPasswordInvalid}
          />
          <Checkbox
            name="acceptTermsAndConditions"
            className={styles.TermsAndConditions}
            label={
              <span>
                I accept{" "}
                <Link isExternal={true} to="http://policy">
                  data protection policy
                </Link>{" "}
                &{" "}
                <Link isExternal={true} to="http://terms">
                  terms and conditions
                </Link>
              </span>
            }
            error={error.isAcceptTermsAndConditionsInvalid}
          />
          <Button type="submit" className={styles.SubmitButton}>
            Create your account
          </Button>
          {error.errorMessage ? (
            <div
              className={classNames(signInStyles.ErrorMessage, "text-error")}>
              {error.errorMessage}
            </div>
          ) : null}
          <Divider />
          <div className={signInStyles.ForgotPasswordWrapper}>
            Already have an account? <Link to="/login">Login!</Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

SignUpPage.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUpPage;
