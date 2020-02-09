import React, {Component} from "react";
import PropTypes from "prop-types";
import {signIn} from "../../auth/auth";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Divider from "../../components/Divider";
import Link from "../../components/Link";

import classNames from "classnames";
import styles from "./signInPage.module.css";
import Card from "../../components/Card";

class SignInPage extends Component {
  state = {
    usernameError: "",
    passwordError: "",
    error: "",
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      error: "",
      usernameError: "",
      passwordError: "",
    });

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      this.setState({
        error: "Username and password are required!",
        usernameError: !username ? "error" : "",
        passwordError: !password ? "error" : "",
      });
      return;
    }

    signIn({username, password})
      .then(() => {
        const redirectState = this.props.location.state || {};
        const {from = {pathname: "/"}} = redirectState;
        this.props.history.replace(
          from.pathname.includes("logout") ? "/" : from
        );
      })
      .catch(err => {
        console.warn("SignIn failed:", err);
        this.setState({error: "Sign In failed!"});
      });
  };

  render() {
    return (
      <div className={styles.Wrapper}>
        <Card title="Login to your account">
          <form className={styles.Form} onSubmit={this.handleSubmit}>
            <TextInput
              name="username"
              label="Your Email"
              placeholder="Your Email"
              isRequired
              error={this.state.usernameError}
            />
            <TextInput
              type="password"
              name="password"
              label="Your Password"
              placeholder="Your Password"
              isRequired
              error={this.state.passwordError}
            />
            <Button type="submit" className={styles.SubmitButton}>
              Login to your account
            </Button>
            {this.state.error ? (
              <div className={classNames(styles.ErrorMessage, "text-error")}>
                {this.state.error}
              </div>
            ) : null}
            <Divider />
            <div className={styles.ForgotPasswordWrapper}>
              Forgot your password?{" "}
              <Link to="/reset-password">Reset your passwords!</Link>
            </div>
          </form>
        </Card>

        <Link to="/sign-up">Sign Up</Link>
      </div>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default SignInPage;
