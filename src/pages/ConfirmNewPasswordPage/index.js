import React, { Component } from "react";
import TextInput from "../../components/TextInput";
import Divider from "../../components/Divider";

import { confirmNewPasswordApi } from "./confirmNewPasswordApi";

import classNames from "classnames";
import styles from "./confirmNewPasswordPage.module.css";
import signInStyles from "../SignInPage/signInPage.module.css";
import Button from "../../components/Button";

class ConfirmNewPasswordPage extends Component {
  state = {
    error: "",
    isPasswordFieldInvalid: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      error: "",
      isPasswordFieldInvalid: false
    });

    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (!password || !confirmPassword) {
      this.setState({
        error: "Password fields are required!",
        isPasswordFieldInvalid: true
      });
      return;
    }

    if (password !== confirmPassword) {
      this.setState({
        error: "The password confirmation does not match!",
        isPasswordFieldInvalid: true
      });
      return;
    }

    confirmNewPasswordApi({ password, token: "todo: parse token" })
      .then(() => {
        this.props.history.replace("/login");
      })
      .catch(err => {
        console.warn("confirmNewPasswordApi failed:", err);
        this.setState({
          error:
            "Password reset has failed, please try again or contact support."
        });
      });
  };

  render() {
    return (
      <div className={signInStyles.Wrapper}>
        <form className={signInStyles.Form} onSubmit={this.handleSubmit}>
          <h3>Confirm new password</h3>
          <Divider />
          <TextInput
            type="password"
            name="password"
            label="New Password"
            placeholder="New Password"
            isRequired
            error={this.state.isPasswordFieldInvalid}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm Password"
            isRequired
            error={this.state.isPasswordFieldInvalid}
          />
          <Button type="submit" className={signInStyles.SubmitButton}>
            Confirm new password
          </Button>
          {this.state.error ? (
            <div
              className={classNames(signInStyles.ErrorMessage, "text-error")}
            >
              {this.state.error}
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default ConfirmNewPasswordPage;
