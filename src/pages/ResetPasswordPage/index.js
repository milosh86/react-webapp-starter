import React, { Component } from "react";
import PropTypes from "prop-types";

import Link from "../../components/Link";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Divider from "../../components/Divider";

import { resetPasswordApi } from "../../auth/authApi";

import classNames from 'classnames';
import styles from "./resetPasswordPage.module.css";
import signInStyles from "../SignInPage/signInPage.module.css";

class ResetPasswordPage extends Component {
  state = {
    error: "",
    isRequestSubmitted: false
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: "" });

    const email = event.target.email.value;

    if (!email) {
      this.setState({ error: "Email is required!" });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      this.setState({ error: "Invalid email!" });
      return;
    }

    resetPasswordApi({ email })
      .then(() => {
        this.setState({ isRequestSubmitted: true });
      })
      .catch(err => {
        console.warn("Sign Up failed:", err);
        this.setState({
          error:
            "Reset attempt has failed, please try again or contact support."
        });
      });
  };

  renderFormBody() {
    return this.state.isRequestSubmitted ? (
      <p className={styles.EmailSentMessage}>
        An email has been sent. Please click the link when you get it.
      </p>
    ) : (
      <>
        <TextInput
          name="email"
          label="Your Email"
          placeholder="Your Email"
          isRequired={true}
          error={this.state.error}
        />
        <Button type="submit" className={signInStyles.SubmitButton}>
          Reset your password
        </Button>
      </>
    );
  }

  render() {
    return (
      <div className={signInStyles.Wrapper}>
        <form className={signInStyles.Form} onSubmit={this.handleSubmit}>
          <h3>Reset your password</h3>
          <Divider />
          {this.renderFormBody()}
          {this.state.error ? (
            <div
              className={classNames(signInStyles.ErrorMessage, "text-error")}
            >
              {this.state.error}
            </div>
          ) : null}
          <Divider />
          <div className={signInStyles.ForgotPasswordWrapper}>
            Do you have an account? <Link to="/login">Login!</Link>
          </div>
        </form>
      </div>
    );
  }
}

ResetPasswordPage.propTypes = {
  prop: PropTypes.string.isRequired
};

export default ResetPasswordPage;
