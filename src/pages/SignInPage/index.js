import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./signInPage.module.css";
import { signIn } from "../../auth/auth";

class SignInPage extends Component {
  state = {
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ error: "" });

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!username || !password) {
      this.setState({ error: "Username and password are required!" });
      return;
    }

    signIn({ username, password })
      .then(() => {
        const redirectState = this.props.location.state || {};
        const { from = { pathname: "/" } } = redirectState;
        this.props.history.replace(
          from.pathname.includes("logout") ? "/" : from
        );
      })
      .catch(err => {
        console.warn("SignIn failed:", err);
        this.setState({ error: "Sign In failed!" });
      });
  };

  render() {
    return (
      <div className={styles.Wrapper}>
        <form className={styles.Form} onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <input type="text" name="username" placeholder="Username" />
          <input type="password" name="password" placeholder="Password" />
          <button type="submit">Submit</button>
        </form>
        {this.state.error ? (
          <div className={styles.ErrorMessage}>{this.state.error}</div>
        ) : null}
      </div>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default SignInPage;
